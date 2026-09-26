import csv
import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from luc_bot import (approve, canonical_url, category, connect,
                     export_approved, import_csv, number, parse_row)


def example(**kwargs):
    row = {
        "fonte": "Proprietário", "url": "https://example.invalid/imovel/1",
        "titulo": "Galpão perto do centro", "cidade": "Indaiatuba",
        "bairro": "Centro", "tipo": "galpao", "finalidade": "alugar",
        "area_m2": "220", "preco_brl": "3500,00", "publicacao_autorizada": "sim",
    }
    row.update(kwargs)
    return row


class TestBot(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.conn = connect(self.root / "catalogo.sqlite3")
        self.addCleanup(self.conn.close)

    def csv_file(self, *rows):
        target = self.root / "entrada.csv"
        with target.open("w", encoding="utf-8", newline="") as handle:
            writer = csv.DictWriter(handle, fieldnames=list(example()), delimiter=";")
            writer.writeheader()
            writer.writerows(rows)
        return target

    def test_dedup_url_and_portal_id(self):
        self.assertEqual(
            canonical_url("https://example.invalid/imovel/1?utm_source=email"),
            canonical_url("https://example.invalid/imovel/1"),
        )
        self.assertEqual(
            canonical_url("https://www.chavesnamao.com.br/imovel/slug/id-1234/"),
            canonical_url("https://chavesnamao.com.br/outro-slug/id-1234/?utm_medium=chat"),
        )

    def test_categories_and_currency(self):
        self.assertEqual(category("estúdio", "qualquer"), "estudio")
        self.assertEqual(category("", "Studio para fotografia"), "estudio")
        self.assertEqual(category("sala comercial", "loja"), "comercial")
        self.assertEqual(number("R$ 2.500,50"), 2500.50)
        self.assertEqual(number("1.200"), 1200.0)

    def test_reject_other_categories_and_unsafe_links(self):
        with self.assertRaises(ValueError):
            parse_row(example(tipo="apartamento"))
        with self.assertRaises(ValueError):
            parse_row(example(url="javascript:alert(1)"))

    def test_csv_duplicate_and_suspected_duplicate(self):
        path = self.csv_file(
            example(),
            example(url="https://example.invalid/imovel/1?utm_source=teste"),
            example(url="https://example.invalid/imovel/outra-oferta"),
        )
        self.assertEqual(import_csv(self.conn, path), (2, 1, 0, 1))
        total = self.conn.execute("SELECT count(*) FROM imoveis").fetchone()[0]
        self.assertEqual(total, 2)
        flagged = self.conn.execute(
            "SELECT count(*) FROM imoveis WHERE possivel_duplicado_de IS NOT NULL"
        ).fetchone()[0]
        self.assertEqual(flagged, 1)

    def test_export_requires_authorization_and_approval(self):
        path = self.csv_file(
            example(publicacao_autorizada="não"),
            example(url="https://example.invalid/imovel/studio",
                    tipo="estúdio", publicacao_autorizada="sim"),
        )
        self.assertEqual(import_csv(self.conn, path)[0], 2)
        with self.assertRaisesRegex(ValueError, "direitos"):
            approve(self.conn, 1)
        target = self.root / "saida" / "catalogo.json"
        self.assertEqual(export_approved(self.conn, target), 0)
        approve(self.conn, 2)
        self.assertEqual(export_approved(self.conn, target), 1)
        data = json.loads(target.read_text(encoding="utf-8"))
        self.assertEqual(data["imoveis"][0]["tipo"], "estudio")
        self.assertEqual(data["imoveis"][0]["id"], "luc-2")

    def test_invalid_row_not_inserted(self):
        path = self.csv_file(example(), example(url="ftp://example.invalid/id/2"))
        self.assertEqual(import_csv(self.conn, path), (1, 0, 1, 0))


if __name__ == "__main__":
    unittest.main()
