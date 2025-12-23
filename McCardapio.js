const dados = {
  lanches:[
    "McDog","X-Burguer","X-Salada","X-Bacon","X-Egg","X-Tudo",
    "Duplo Burguer","Chicken Burger","McCheddar","McOnion"
  ],
  porcoes:["Batata P","Batata M","Batata G","Calabresa"],
  beirutes:["Beirute Frango","Beirute Carne","Beirute Misto"],
  bebidas:["Coca Lata","Guaraná Lata","Coca 2L","Suco Laranja","Cerveja Lata"]
};

let categoria="lanches",contador=0;

function selecionar(cat){
  categoria=cat;
  document.querySelectorAll(".btn-nav").forEach(b=>b.classList.remove("active"));
  document.getElementById("btn-"+cat).classList.add("active");
  render();
}

function render(){
  const box=document.getElementById("sabores");
  box.innerHTML="";
  dados[categoria].forEach(item=>{
    box.innerHTML+=`
      <div class="item-card">
        <h3>${item}</h3>
        <button class="btn-add" onclick="add('${item}')">ADICIONAR</button>
      </div>`;
  });
}

function add(nome){
  document.getElementById("pedido").value+=`${categoria.slice(0,-1)}: ${nome}\n`;
  contador++;
  document.getElementById("cart-count").innerText=contador;
  alerta("Adicionado","Item incluído com sucesso");
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
