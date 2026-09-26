/* Dados preliminares para teste de interface. Não houve integração com o portal de origem. */
const referencias = [
{id:"39941937",tipo:"galpao",titulo:"Galpão no Distrito Industrial",bairro:"Distrito Industrial de Indaiatuba",area:295,areaTipo:"útil",valor:6000,url:"https://www.chavesnamao.com.br/imovel/galpao-para-alugar-1-sala-com-garagem-sp-indaiatuba-distrito-industrial-de-indaiatuba-315m2-RS6000/id-39941937/"},
{id:"46761133",tipo:"galpao",titulo:"Galpão comercial no Jardim Eldorado",bairro:"Jardim Eldorado",area:251,areaTipo:"útil",valor:8000,url:"https://www.chavesnamao.com.br/imovel/galpao-para-alugar-2-salas-sp-indaiatuba-jardim-eldorado-300m2-RS8000/id-46761133/"},
{id:"46591436",tipo:"galpao",titulo:"Galpão no Jardim Santa Cruz",bairro:"Jardim Santa Cruz",area:230,areaTipo:"útil",valor:7000,url:"https://www.chavesnamao.com.br/imovel/galpao-para-alugar-sp-indaiatuba-jardim-santa-cruz-300m2-RS7000/id-46591436/"},
{id:"30976986",tipo:"galpao",titulo:"Galpão no Parque Campo Bonito",bairro:"Parque Campo Bonito",area:280,areaTipo:"útil",valor:6000,url:"https://www.chavesnamao.com.br/imovel/galpao-para-alugar-com-garagem-sp-indaiatuba-parque-campo-bonito-280m2-RS6000/id-30976986/"},
{id:"46043281",tipo:"galpao",titulo:"Galpão no Park Comercial",bairro:"Park Comercial de Indaiatuba",area:310,areaTipo:"fabril",valor:10000,url:"https://www.chavesnamao.com.br/imovel/galpao-para-alugar-sp-indaiatuba-park-comercial-de-indaiatuba-632m2-RS10000/id-46043281/"},
{id:"18674667",tipo:"galpao",titulo:"Salão ou galpão no Jardim Regente",bairro:"Jardim Regente",area:250,areaTipo:"útil",valor:7500,url:"https://www.chavesnamao.com.br/imovel/galpao-para-alugar-1-sala-com-garagem-sp-indaiatuba-jardim-regente-250m2-RS7500/id-18674667/",observacao:"Possíveis anúncios duplicados a conferir."},
{id:"42081612",tipo:"galpao",titulo:"Galpão no Jardim Colonial",bairro:"Jardim Colonial",area:350,areaTipo:"construída",valor:12500,url:"https://www.chavesnamao.com.br/imovel/galpao-para-alugar-1-sala-com-garagem-sp-indaiatuba-jardim-colonial-RS12500/id-42081612/"},
{id:"45677366",tipo:"galpao",titulo:"Galpão no Monte Castelo",bairro:"Loteamento Comercial Monte Castelo",area:180,areaTipo:"útil",valor:6500,url:"https://www.chavesnamao.com.br/imovel/galpao-para-alugar-1-sala-sp-indaiatuba-loteamento-comercial-monte-castelo-180m2-RS6500/id-45677366/"},
{id:"43281070",tipo:"comercial",titulo:"Salão comercial no Morada do Sol",bairro:"Jardim Morada do Sol",area:200,areaTipo:"útil",valor:6600,url:"https://www.chavesnamao.com.br/imovel/ponto-comercial-para-alugar-com-garagem-sp-indaiatuba-jardim-morada-do-sol-200m2-RS6600/id-43281070/"},
{id:"44249694",tipo:"comercial",titulo:"Salão comercial no Jardim Santa Cruz",bairro:"Jardim Santa Cruz",area:200,areaTipo:"útil",valor:7000,url:"https://www.chavesnamao.com.br/imovel/ponto-comercial-para-alugar-sp-indaiatuba-jardim-santa-cruz-RS7000/id-44249694/"},
{id:"43764847",tipo:"comercial",titulo:"Sala comercial na Rua Treze de Maio",bairro:"Centro",area:18,areaTipo:"útil",valor:3000,url:"https://www.chavesnamao.com.br/imovel/sala-comercial-para-alugar-sp-indaiatuba-centro-RS3000/id-43764847/",observacao:"Captado do Chaves na Mão em 26/09/2026; confirme preço, área e disponibilidade na origem."},
{id:"46850102",tipo:"comercial",titulo:"Sala comercial na Rua Nove de Julho",bairro:"Centro",area:78,areaTipo:"útil",valor:2200,url:"https://www.chavesnamao.com.br/imovel/sala-comercial-para-alugar-sp-indaiatuba-centro-78m2-RS2200/id-46850102/",observacao:"Captado do Chaves na Mão em 26/09/2026; confirme preço, área e disponibilidade na origem."},
{id:"47022433",tipo:"comercial",titulo:"Salão comercial no Centro",bairro:"Centro",area:357,areaTipo:"útil",valor:15000,url:"https://www.chavesnamao.com.br/imovel/sala-comercial-para-alugar-sp-indaiatuba-centro-357m2-RS15000/id-47022433/",observacao:"Captado do Chaves na Mão em 26/09/2026; confirme preço, área e disponibilidade na origem."},
{id:"46915416",tipo:"comercial",titulo:"Sala comercial na Vila Homero",bairro:"Vila Homero",area:322,areaTipo:"útil",valor:60000,url:"https://www.chavesnamao.com.br/imovel/sala-comercial-para-alugar-com-garagem-sp-indaiatuba-vila-homero-322m2-RS60000/id-46915416/",observacao:"Captado do Chaves na Mão em 26/09/2026; confirme preço, área e disponibilidade na origem."},
{id:"46771939",tipo:"comercial",titulo:"Loja comercial na Rua Treze de Maio",bairro:"Centro",area:250,areaTipo:"útil",valor:12000,url:"https://www.chavesnamao.com.br/imovel/sala-comercial-para-alugar-sp-indaiatuba-centro-250m2-RS12000/id-46771939/",observacao:"Captado do Chaves na Mão em 26/09/2026; confirme preço, área e disponibilidade na origem."},
{id:"46413779",tipo:"comercial",titulo:"Sala comercial na Vila Furlan",bairro:"Vila Furlan",area:31,areaTipo:"útil",valor:3000,url:"https://www.chavesnamao.com.br/imovel/sala-comercial-para-alugar-sp-indaiatuba-vila-furlan-31m2-RS3000/id-46413779/",observacao:"Captado do Chaves na Mão em 26/09/2026; confirme preço, área e disponibilidade na origem."},
{id:"47028362",tipo:"comercial",titulo:"Salão comercial na Rua Nove de Julho",bairro:"Centro",area:200,areaTipo:"útil",valor:8300,url:"https://www.chavesnamao.com.br/imovel/sala-comercial-para-alugar-sp-indaiatuba-centro-200m2-RS8300/id-47028362/",observacao:"Captado do Chaves na Mão em 26/09/2026; confirme preço, área e disponibilidade na origem."},
{id:"44573867",tipo:"comercial",titulo:"Sala comercial na Vila Homero",bairro:"Vila Homero",area:44,areaTipo:"útil",valor:4200,url:"https://www.chavesnamao.com.br/imovel/sala-comercial-para-alugar-sp-indaiatuba-vila-homero-RS4200/id-44573867/",observacao:"Captado do Chaves na Mão em 26/09/2026; confirme preço, área e disponibilidade na origem."},
{id:"41770405",tipo:"comercial",titulo:"Sala comercial no Sky Tower Office",bairro:"Vila Homero",area:450,areaTipo:"útil",valor:30000,url:"https://www.chavesnamao.com.br/imovel/sala-comercial-para-alugar-com-garagem-sp-indaiatuba-vila-homero-450m2-RS30000/id-41770405/",observacao:"Captado do Chaves na Mão em 26/09/2026; confirme preço, área e disponibilidade na origem."},
{id:"43802012",tipo:"comercial",titulo:"Salão comercial na Cidade Nova I",bairro:"Cidade Nova I",area:200,areaTipo:"útil",valor:18000,url:"https://www.chavesnamao.com.br/imovel/sala-comercial-para-alugar-3-salas-com-garagem-sp-indaiatuba-cidade-nova-i-250m2-RS18000/id-43802012/",observacao:"Captado do Chaves na Mão em 26/09/2026; confirme preço, área e disponibilidade na origem."},
{id:"42892231",tipo:"galpao",titulo:"Galpão no Centro Empresarial de Indaiatuba",bairro:"Centro Empresarial de Indaiatuba",area:250,areaTipo:"total",valor:7200,url:"https://www.chavesnamao.com.br/imovel/galpao-para-alugar-1-sala-com-garagem-sp-indaiatuba-centro-empresarial-de-indaiatuba-250m2-RS7200/id-42892231/",observacao:"Captado do Chaves na Mão em 26/09/2026; confirme preço, área e disponibilidade na origem."},
{id:"35447807",tipo:"galpao",titulo:"Galpão industrial no Centro Empresarial",bairro:"Centro Empresarial de Indaiatuba",area:200,areaTipo:"útil",valor:7200,url:"https://www.chavesnamao.com.br/imovel/galpao-para-alugar-1-sala-com-garagem-sp-indaiatuba-centro-empresarial-de-indaiatuba-200m2-RS7200/id-35447807/",observacao:"Captado do Chaves na Mão em 26/09/2026; confirme preço, área e disponibilidade na origem."},
{id:"35207479",tipo:"galpao",titulo:"Galpão no Parque Campo Bonito",bairro:"Parque Campo Bonito",area:280,areaTipo:"útil",valor:5900,url:"https://www.chavesnamao.com.br/imovel/galpao-para-alugar-2-salas-com-garagem-sp-indaiatuba-parque-campo-bonito-152m2-RS5900/id-35207479/",observacao:"Captado do Chaves na Mão em 26/09/2026; confirme preço, área e disponibilidade na origem."},
{id:"45554581",tipo:"galpao",titulo:"Galpão comercial no Parque Campo Bonito",bairro:"Parque Campo Bonito",area:280,areaTipo:"útil",valor:6000,url:"https://www.chavesnamao.com.br/imovel/galpao-para-alugar-2-salas-sp-indaiatuba-parque-campo-bonito-150m2-RS6000/id-45554581/",observacao:"Captado do Chaves na Mão em 26/09/2026; confirme preço, área e disponibilidade na origem."},
{id:"40618466",tipo:"galpao",titulo:"Galpão no Distrito Industrial João Narezzi",bairro:"Distrito Industrial João Narezzi",area:123,areaTipo:"útil",valor:5500,url:"https://www.chavesnamao.com.br/imovel/galpao-para-alugar-1-sala-com-garagem-sp-indaiatuba-distrito-industrial-joao-narezzi-287m2-RS5500/id-40618466/",observacao:"Captado do Chaves na Mão em 26/09/2026; confirme preço, área e disponibilidade na origem."}
];


/* Uma fonte de dados para Novidades e as três páginas de categoria. */
const moeda = new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0});
const normalizar = valor => String(valor || "").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
const categoriaPagina = document.body.dataset.categoria || "todos";
const urls = new URLSearchParams(window.location.search);
const cards = document.getElementById("catalog-cards");
const contador = document.getElementById("catalog-count");
const vazio = document.getElementById("catalog-empty");
const bairroEl = document.getElementById("catalog-bairro");
const tipoEl = document.getElementById("catalog-type");
const areaEl = document.getElementById("catalog-area");
const ordemEl = document.getElementById("catalog-sort");
const menu = document.getElementById("main-menu");
const mobileButton = document.getElementById("catalog-mobile-button");

function categoriaDoImovel(imovel) {
  const tipo = normalizar(imovel.tipo);
  if (["galpao","galpoes","barracao"].includes(tipo)) return "galpao";
  if (["estudio","estudios","studio","studios"].includes(tipo)) return "estudio";
  if (["comercial","sala","sala comercial","salao","salao comercial","ponto comercial"].includes(tipo)) return "comercial";
  if (tipo === "terreno") return "terreno";
  const titulo = normalizar(imovel.titulo);
  if (/\b(galpao|barracao|deposito)\b/.test(titulo)) return "galpao";
  if (/\b(estudio|studio)\b/.test(titulo)) return "estudio";
  if (/\b(sala|salao|ponto) comercial\b/.test(titulo)) return "comercial";
  return tipo || "outros";
}
const catalogoDaPagina = referencias.filter(imovel => categoriaPagina === "todos" || categoriaDoImovel(imovel) === categoriaPagina);

function ficha(imovel,pos,total) {
  const artigo = document.createElement("article");
  artigo.className = "catalog-card";
  const arte = document.createElement("div");
  arte.className = "catalog-art";
  const selo = document.createElement("span");
  selo.textContent = "NOVO NO SITE · ALUGUEL";
  const numero = document.createElement("small");
  numero.textContent = String(pos).padStart(2,"0")+" / "+String(total).padStart(2,"0");
  arte.append(selo,numero);
  const corpo = document.createElement("div");
  corpo.className = "catalog-card-body";
  const local = document.createElement("span");
  local.className = "catalog-neighborhood";
  local.textContent = "⌖ "+imovel.bairro+" · Indaiatuba, SP";
  const titulo = document.createElement("h3");
  titulo.textContent = imovel.titulo;
  const etiquetas = document.createElement("div");
  etiquetas.className = "catalog-tags";
  const rotulos = {galpao:"Galpão",estudio:"Estúdio",comercial:"Espaço comercial",terreno:"Terreno"};
  for (const rotulo of [imovel.area+" m² ("+imovel.areaTipo+")",rotulos[categoriaDoImovel(imovel)]||"Imóvel"]) {
    const tag = document.createElement("span");
    tag.textContent = rotulo;
    etiquetas.appendChild(tag);
  }
  const nota = document.createElement("p");
  nota.className = "catalog-card-note";
  nota.textContent = imovel.observacao || "Dados externos de referência; confirme no anúncio original.";
  const preco = document.createElement("div");
  preco.className = "catalog-price";
  preco.textContent = "Valor informado · não confirmado";
  const quantia = document.createElement("strong");
  quantia.textContent = moeda.format(imovel.valor)+"/mês";
  preco.appendChild(quantia);
  const link = document.createElement("a");
  link.className = "catalog-action";
  link.href = imovel.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer nofollow";
  link.append("Ver anúncio original");
  const seta = document.createElement("span");
  seta.textContent = "↗";
  seta.setAttribute("aria-hidden","true");
  link.appendChild(seta);
  corpo.append(local,titulo,etiquetas,nota,preco,link);
  artigo.append(arte,corpo);
  return artigo;
}

function renderizar() {
  const tipo = tipoEl ? tipoEl.value : categoriaPagina;
  const termo = normalizar(bairroEl.value);
  const area = Number(areaEl.value);
  const finalidade = urls.get("finalidade") || "alugar";
  const selecionados = catalogoDaPagina.filter(imovel =>
    (tipo === "todos" || categoriaDoImovel(imovel) === tipo) &&
    (!termo || normalizar(imovel.bairro).includes(termo)) &&
    Number(imovel.area) >= area &&
    (finalidade === "alugar" || imovel.finalidade === finalidade)
  );
  if (ordemEl.value === "menor-preco") selecionados.sort((a,b) => a.valor-b.valor);
  if (ordemEl.value === "maior-area") selecionados.sort((a,b) => b.area-a.area);
  cards.replaceChildren(...selecionados.map((imovel,indice)=>ficha(imovel,indice+1,selecionados.length)));
  contador.textContent = selecionados.length+" de "+catalogoDaPagina.length+" imóveis exibidos";
  vazio.hidden = selecionados.length > 0;
  if (!selecionados.length) {
    if (!catalogoDaPagina.length) {
      vazio.textContent = categoriaPagina === "estudio" ?
        "Ainda não temos estúdios cadastrados. Assim que forem adicionados ao catálogo, aparecerão aqui automaticamente." :
        "Ainda não há imóveis cadastrados nesta categoria.";
    } else if (finalidade !== "alugar") {
      vazio.textContent = "Ainda não há imóveis para esta finalidade entre os registros cadastrados. Confira a seção Novidades ou escolha Alugar.";
    } else {
      vazio.textContent = "Nenhum imóvel corresponde aos filtros. Experimente mudar o bairro ou a área mínima.";
    }
  }
}

if (tipoEl && urls.has("tipo") && [...tipoEl.options].some(o=>o.value===urls.get("tipo"))) tipoEl.value=urls.get("tipo");
if (urls.has("area") && [...areaEl.options].some(o=>o.value===urls.get("area"))) areaEl.value=urls.get("area");
if (urls.has("bairro")) bairroEl.value=urls.get("bairro");
[tipoEl,bairroEl,areaEl,ordemEl].filter(Boolean).forEach(el => el.addEventListener(el===bairroEl?"input":"change",renderizar));
if (mobileButton && menu) {
  mobileButton.addEventListener("click",()=>{
    const aberto=menu.classList.toggle("open");
    mobileButton.setAttribute("aria-expanded",String(aberto));
    mobileButton.setAttribute("aria-label",aberto?"Fechar menu":"Abrir menu");
  });
  menu.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
    menu.classList.remove("open");
    mobileButton.setAttribute("aria-expanded","false");
  }));
}
document.getElementById("catalog-year").textContent=String(new Date().getFullYear());
renderizar();
