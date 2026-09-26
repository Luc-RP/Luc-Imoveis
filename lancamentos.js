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
{id:"44249694",tipo:"comercial",titulo:"Salão comercial no Jardim Santa Cruz",bairro:"Jardim Santa Cruz",area:200,areaTipo:"útil",valor:7000,url:"https://www.chavesnamao.com.br/imovel/ponto-comercial-para-alugar-sp-indaiatuba-jardim-santa-cruz-RS7000/id-44249694/"}
];

const currency = new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0});
const normalize = text => String(text).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const container = document.getElementById("catalog-cards");
const count = document.getElementById("catalog-count");
const empty = document.getElementById("catalog-empty");
const typeControl = document.getElementById("catalog-type");
const neighborhoodControl = document.getElementById("catalog-bairro");
const areaControl = document.getElementById("catalog-area");
const sortControl = document.getElementById("catalog-sort");
const menu = document.getElementById("main-menu");
const mobileButton = document.getElementById("catalog-mobile-button");

function cardFor(imovel,position){
  const card = document.createElement("article");
  card.className = "catalog-card";
  const artwork = document.createElement("div");
  artwork.className = "catalog-art";
  const status = document.createElement("span");
  status.textContent = "REFERÊNCIA · ALUGUEL";
  const number = document.createElement("small");
  number.textContent = String(position).padStart(2,"0") + " / 10";
  artwork.append(status,number);
  const body = document.createElement("div");
  body.className = "catalog-card-body";
  const location = document.createElement("span");
  location.className = "catalog-neighborhood";
  location.textContent = "⌖ " + imovel.bairro + " · Indaiatuba, SP";
  const title = document.createElement("h3");
  title.textContent = imovel.titulo;
  const tags = document.createElement("div");
  tags.className = "catalog-tags";
  for(const label of [imovel.area+" m² ("+imovel.areaTipo+")",imovel.tipo==="galpao"?"Galpão":"Comercial"]){
    const tag = document.createElement("span");
    tag.textContent=label;
    tags.appendChild(tag);
  }
  const note = document.createElement("p");
  note.className = "catalog-card-note";
  note.textContent = imovel.observacao || "Dados preliminares, ainda não confirmados na origem.";
  const price = document.createElement("div");
  price.className = "catalog-price";
  price.textContent = "Valor de referência · não confirmado";
  const amount = document.createElement("strong");
  amount.textContent = currency.format(imovel.valor) + "/mês";
  price.appendChild(amount);
  const link = document.createElement("a");
  link.className = "catalog-action";
  link.href = imovel.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer nofollow";
  link.append("Ver anúncio original");
  const arrow = document.createElement("span");
  arrow.textContent="↗";
  arrow.setAttribute("aria-hidden","true");
  link.appendChild(arrow);
  body.append(location,title,tags,note,price,link);
  card.append(artwork,body);
  return card;
}

function render(){
  const type=typeControl.value;
  const bairro=normalize(neighborhoodControl.value.trim());
  const area=Number(areaControl.value);
  const filtered=referencias.filter(item=>
    (type==="todos"||item.tipo===type)&&
    (!bairro||normalize(item.bairro).includes(bairro))&&
    item.area>=area
  );
  if(sortControl.value==="menor-preco") filtered.sort((a,b)=>a.valor-b.valor);
  if(sortControl.value==="maior-area") filtered.sort((a,b)=>b.area-a.area);
  container.replaceChildren(...filtered.map((item,index)=>cardFor(item,index+1)));
  empty.hidden=filtered.length>0;
  count.textContent=filtered.length+" de 10 referências exibidas";
}
[typeControl,neighborhoodControl,areaControl,sortControl].forEach(el=>{
  el.addEventListener(el===neighborhoodControl?"input":"change",render);
});
if(mobileButton&&menu){
 mobileButton.addEventListener("click",()=>{
  const open=menu.classList.toggle("open");
  mobileButton.setAttribute("aria-expanded",String(open));
 });
 menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  menu.classList.remove("open");mobileButton.setAttribute("aria-expanded","false");
 }));
}
document.getElementById("catalog-year").textContent=String(new Date().getFullYear());
render();
