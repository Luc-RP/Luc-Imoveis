#!/usr/bin/env python3
"""Bot de curadoria LUC Imóveis. Não acessa portais nem faz scraping."""
import argparse
import csv
import json
import re
import sqlite3
import sys
import unicodedata
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

BASE = Path(__file__).parent
DEFAULT_DB = BASE / ".local" / "catalogo.sqlite3"
COLS = ("fonte", "url", "titulo", "cidade", "bairro",
        "tipo", "finalidade", "area_m2", "preco_brl", "publicacao_autorizada")
TYPES = {
    "galpao": "galpao", "galpoes": "galpao", "barracao": "galpao",
    "estudio": "estudio", "estudios": "estudio", "studio": "estudio",
    "comercial": "comercial", "sala comercial": "comercial",
    "salao comercial": "comercial", "ponto comercial": "comercial",
}
TRACKING = {"fbclid", "gclid", "msclkid", "ref", "source"}


def normalized(text):
    s = unicodedata.normalize("NFD", str(text or "").strip())
    return "".join(c for c in s if unicodedata.category(c) != "Mn").lower()


def number(text):
    s = str(text or "").strip().replace("R$", "").replace("m²", "").replace(" ", "")
    if "," in s:
        s = s.replace(".", "").replace(",", ".")
    elif re.fullmatch(r"\d{1,3}(?:\.\d{3})+", s):
        s = s.replace(".", "")
    try:
        result = float(s)
    except ValueError as exc:
        raise ValueError("área ou preço inválido") from exc
    if not 0 < result <= 100_000_000:
        raise ValueError("área ou preço fora do limite")
    return result


def canonical_url(raw):
    parts = urlsplit(str(raw or "").strip())
    if parts.scheme.lower() != "https" or not parts.hostname:
        raise ValueError("URL precisa ser HTTPS e ter domínio")
    if parts.username or parts.password:
        raise ValueError("URLs com credenciais não são permitidas")
    if parts.port and parts.port != 443:
        raise ValueError("porta HTTPS não padrão")
    host = parts.hostname.lower().removeprefix("www.")
    path = "/" + parts.path.strip("/") if parts.path.strip("/") else "/"
    # Slugs diferentes podem apontar para o mesmo anúncio do Chaves na Mão.
    if host == "chavesnamao.com.br":
        match = re.search(r"/id-(\d+)(?:/|$)", path)
        if match:
            return f"https://{host}/id-{match.group(1)}"
    query = [(k, v) for k, v in parse_qsl(parts.query, keep_blank_values=True)
             if not k.lower().startswith("utm_") and k.lower() not in TRACKING]
    return urlunsplit(("https", host, path, urlencode(sorted(query)), ""))


def category(kind, title):
    key = normalized(kind)
    if key in TYPES:
        return TYPES[key]
    if key:
        raise ValueError("tipo permitido: galpão, estúdio ou sala comercial")
    title = normalized(title)
    if re.search(r"\b(galpao|barracao)\b", title):
        return "galpao"
    if re.search(r"\b(estudio|studio)\b", title):
        return "estudio"
    if re.search(r"\b(sala|salao|ponto) comercial\b", title):
        return "comercial"
    raise ValueError("tipo não identificado no título")


def parse_row(raw):
    for field in ("fonte", "url", "titulo", "cidade", "bairro"):
        if not str(raw.get(field) or "").strip():
            raise ValueError(f"campo obrigatório: {field}")
    purpose = normalized(raw.get("finalidade"))
    if purpose not in {"alugar", "comprar"}:
        raise ValueError("finalidade deve ser alugar ou comprar")
    area, price = number(raw.get("area_m2")), number(raw.get("preco_brl"))
    if area > 1_000_000:
        raise ValueError("área acima do limite")
    url = str(raw["url"]).strip()
    return {
        "fonte": raw["fonte"].strip(), "url": url,
        "canonical": canonical_url(url), "titulo": raw["titulo"].strip(),
        "cidade": raw["cidade"].strip(), "bairro": raw["bairro"].strip(),
        "tipo": category(raw.get("tipo"), raw["titulo"]),
        "finalidade": purpose, "area": area, "preco": price,
        "autorizado": int(normalized(raw.get("publicacao_autorizada")) in
                         {"sim", "s", "true", "1", "yes"}),
    }


def connect(path):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    conn.execute("""
        CREATE TABLE IF NOT EXISTS imoveis (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fonte TEXT NOT NULL, url TEXT NOT NULL, canonical TEXT NOT NULL UNIQUE,
          titulo TEXT NOT NULL, cidade TEXT NOT NULL, bairro TEXT NOT NULL,
          tipo TEXT NOT NULL CHECK (tipo IN ('galpao','estudio','comercial')),
          finalidade TEXT NOT NULL CHECK (finalidade IN ('alugar','comprar')),
          area REAL NOT NULL, preco REAL NOT NULL,
          autorizado INTEGER NOT NULL DEFAULT 0,
          aprovado INTEGER NOT NULL DEFAULT 0,
          possivel_duplicado_de INTEGER,
          criado_em TEXT NOT NULL
        )
    """)
    return conn


def import_csv(conn, filename):
    added = skipped = rejected = possible = 0
    with open(filename, newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle, delimiter=";")
        missing = set(COLS) - set(reader.fieldnames or [])
        if missing:
            raise ValueError("colunas ausentes: " + ", ".join(sorted(missing)))
        for line, record in enumerate(reader, 2):
            try:
                item = parse_row(record)
            except (ValueError, TypeError) as exc:
                rejected += 1
                print(f"Linha {line}: {exc}", file=sys.stderr)
                continue
            if conn.execute("SELECT 1 FROM imoveis WHERE canonical=?",
                            (item["canonical"],)).fetchone():
                skipped += 1
                continue
            # Possível repetição do mesmo imóvel por anunciantes diferentes.
            # Nunca fundimos dois registros distintos automaticamente.
            similar = conn.execute("""
                SELECT id FROM imoveis WHERE lower(cidade)=lower(?)
                  AND lower(bairro)=lower(?) AND tipo=? AND area=? AND preco=?
                LIMIT 1
            """, (item["cidade"], item["bairro"], item["tipo"],
                  item["area"], item["preco"])).fetchone()
            conn.execute("""
                INSERT INTO imoveis
                (fonte,url,canonical,titulo,cidade,bairro,tipo,finalidade,
                 area,preco,autorizado,possivel_duplicado_de,criado_em)
                VALUES (:fonte,:url,:canonical,:titulo,:cidade,:bairro,:tipo,:finalidade,
                        :area,:preco,:autorizado,:possivel_duplicado_de,:criado_em)
            """, {**item,
                  "possivel_duplicado_de": similar["id"] if similar else None,
                  "criado_em": datetime.now(timezone.utc).isoformat()})
            added += 1
            possible += bool(similar)
    conn.commit()
    return added, skipped, rejected, possible


def approve(conn, item_id):
    item = conn.execute("SELECT autorizado FROM imoveis WHERE id=?",
                        (item_id,)).fetchone()
    if item is None:
        raise ValueError("registro não encontrado")
    if not item["autorizado"]:
        raise ValueError("direitos de publicação não confirmados neste registro")
    conn.execute("UPDATE imoveis SET aprovado=1 WHERE id=?", (item_id,))
    conn.commit()


def export_approved(conn, path):
    rows = conn.execute("""
        SELECT * FROM imoveis WHERE autorizado=1 AND aprovado=1 ORDER BY id DESC
    """).fetchall()
    result = {
        "versao": 1, "gerado_em": datetime.now(timezone.utc).isoformat(),
        "aviso": "Preço e disponibilidade devem ser conferidos na origem.",
        "imoveis": [
            {"id": f"luc-{r['id']}", "tipo": r["tipo"], "titulo": r["titulo"],
             "cidade": r["cidade"], "bairro": r["bairro"], "area": r["area"],
             "areaTipo": "informada", "valor": r["preco"], "finalidade": r["finalidade"],
             "url": r["url"], "fonte": r["fonte"],
             "disponibilidadeConfirmada": False}
            for r in rows
        ]
    }
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n",
                         encoding="utf-8")
    temporary.replace(path)
    return len(rows)


def main(argv=None):
    parser = argparse.ArgumentParser(description="LUC Imóveis: bot de curadoria local")
    parser.add_argument("--banco", type=Path, default=DEFAULT_DB)
    commands = parser.add_subparsers(dest="acao", required=True)
    importer = commands.add_parser("importar", help="Importar CSV manual ou feed autorizado")
    importer.add_argument("--arquivo", type=Path, required=True)
    commands.add_parser("listar", help="Listar registros e situação")
    approval = commands.add_parser("aprovar", help="Aprovar registro autorizado")
    approval.add_argument("--id", type=int, required=True)
    exporter = commands.add_parser("exportar", help="Exportar somente registros aprovados")
    exporter.add_argument("--saida", type=Path, required=True)
    args = parser.parse_args(argv)
    try:
        with connect(args.banco) as conn:
            if args.acao == "importar":
                a, s, r, p = import_csv(conn, args.arquivo)
                print(f"Importados: {a} | repetidos: {s} | inválidos: {r} | possíveis duplicados: {p}")
            elif args.acao == "listar":
                rows = conn.execute("SELECT * FROM imoveis ORDER BY id DESC").fetchall()
                for row in rows:
                    label = "aprovado" if row["aprovado"] else "pendente"
                    near = f" | possível duplicado de #{row['possivel_duplicado_de']}" \
                        if row["possivel_duplicado_de"] else ""
                    print(f"#{row['id']} | {row['tipo']} | {row['titulo']} | "
                          f"{row['bairro']} | R$ {row['preco']:.2f} | {label}{near}")
                print(f"Total: {len(rows)}")
            elif args.acao == "aprovar":
                approve(conn, args.id)
                print(f"Registro #{args.id} aprovado")
            elif args.acao == "exportar":
                total = export_approved(conn, args.saida)
                print(f"Exportados: {total} para {args.saida}")
    except (OSError, ValueError, sqlite3.Error) as exc:
        parser.exit(1, f"Erro: {exc}\n")


if __name__ == "__main__":
    main()
