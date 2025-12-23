const cardapio = {
  lanches:[
    {n:"McDog",p:12},
    {n:"X-Burguer",p:14},
    {n:"X-Salada",p:16},
    {n:"X-Bacon",p:18},
    {n:"X-Egg",p:17},
    {n:"X-Tudo",p:22}
  ],
  porcoes:[
    {n:"Batata P",p:10},
    {n:"Batata M",p:15},
    {n:"Batata G",p:20},
    {n:"Calabresa",p:22}
  ],
  beirutes:[
    {n:"Beirute Frango",p:28},
    {n:"Beirute Carne",p:30},
    {n:"Beirute Misto",p:32}
  ],
  bebidas:[
    {n:"Coca Lata",p:6},
    {n:"Guaraná Lata",p:6},
    {n:"Coca 2L",p:12},
    {n:"Suco Laranja",p:8},
    {n:"Cerveja Lata",p:7}
  ]
};

let categoria="lanches";
let contador=0;
let total=0;

function selecionar(cat){
  categoria=cat;
  document.querySelectorAll(".btn-nav").forEach(b=>b.classList.remove("active"));
  document.getElementById("btn-"+cat).classList.add("active");
  render();
}

function render(){
  const box=document.getElementById("sabores");
  box.innerHTML="";
  cardapio[categoria].forEach(item=>{
    box.innerHTML+=`
      <div class="item-card">
        <h3>${item.n}</h3>
        <p class="preco">R$ ${item.p.toFixed(2)}</p>
        <button class="btn-add" onclick="add('${item.n}',${item.p})">ADICIONAR</button>
      </div>`;
  });
}

function add(nome,preco){
  document.getElementById("pedido").value+=`${categoria.slice(0,-1)}: ${nome} - R$ ${preco.toFixed(2)}\n`;
  contador++;
  total+=preco;
  document.getElementById("cart-count").innerText=contador;
  alerta("Adicionado","Item incluído no pedido");
}

function editarPedido(){
  document.getElementById("pedido").value="";
  contador=0;
  total=0;
  document.getElementById("cart-count").innerText="0";
}

function toggleCarrinho(){
  document.getElementById("carrinho").classList.toggle("open");
}

function mostrarDados(tipo){
  document.getElementById("entregaCampos").style.display =
    tipo==="delivery"?"block":"none";

  document.querySelectorAll(".btn-opcao-gigante")
    .forEach(b=>b.classList.remove("active"));

  tipo==="delivery"
    ? document.querySelectorAll(".btn-opcao-gigante")[1].classList.add("active")
    : document.querySelectorAll(".btn-opcao-gigante")[0].classList.add("active");
}

function mostrarTroco(){
  document.getElementById("valorTroco").style.display =
    pagamento.value==="Dinheiro"?"block":"none";
}

function enviarPedido(){
  const txt=encodeURIComponent(document.getElementById("pedido").value);
  window.open(`https://wa.me/5511943198316?text=*PEDIDO McClone*%0A${txt}`);
}

function alerta(t,m){
  document.getElementById("alert-title").innerText=t;
  document.getElementById("alert-msg").innerText=m;
  document.getElementById("custom-alert-overlay").style.display="flex";
}

function fecharAlerta(){
  document.getElementById("custom-alert-overlay").style.display="none";
}

selecionar("lanches");
