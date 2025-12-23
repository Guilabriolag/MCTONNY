const lanches=[
 {n:"McDog",d:"Salsicha, molho e batata palha",p:12},
 {n:"X-Burguer",d:"Hambúrguer e queijo",p:14},
 {n:"X-Salada",d:"Hambúrguer, queijo e salada",p:16},
 {n:"X-Bacon",d:"Hambúrguer, queijo e bacon",p:18},
 {n:"X-Egg",d:"Hambúrguer, queijo e ovo",p:17},
 {n:"X-Tudo",d:"Completo",p:22},
 {n:"Duplo Burguer",d:"2 hambúrgueres",p:20},
 {n:"Chicken Burger",d:"Frango empanado",p:18},
 {n:"McCheddar",d:"Cheddar cremoso",p:19},
 {n:"McOnion",d:"Onion rings",p:18}
];

const porcoes=[
 {n:"Batata P",d:"Individual",p:10},
 {n:"Batata M",d:"2 pessoas",p:15},
 {n:"Batata G",d:"Família",p:20},
 {n:"Calabresa",d:"Acebolada",p:22}
];

const beirutes=[
 {n:"Beirute Frango",d:"Frango grelhado",p:28},
 {n:"Beirute Carne",d:"Carne acebolada",p:30},
 {n:"Beirute Misto",d:"Carne e frango",p:32}
];

const bebidas=[
 {n:"Coca-Cola Lata",p:6},
 {n:"Guaraná Lata",p:6},
 {n:"Coca 2L",p:12},
 {n:"Suco Laranja",p:8},
 {n:"Cerveja Lata",p:7}
];

let atual="lanches",contador=0;

function selecionar(cat){
 atual=cat;
 document.querySelectorAll(".btn-nav").forEach(b=>b.classList.remove("active"));
 document.getElementById("btn-"+cat).classList.add("active");
 render();
}

function render(){
 const box=document.getElementById("sabores");
 box.innerHTML="";
 let lista={lanches,porcoes,beirutes,bebidas}[atual];
 lista.forEach(i=>{
  box.innerHTML+=`
   <div class="item-card">
    <h3>${i.n}</h3>
    <p>${i.d||""}</p>
    <div>
     <b>R$ ${i.p.toFixed(2)}</b>
     <button class="btn-add" onclick="add('${i.n}',${i.p})">ADD</button>
    </div>
   </div>`;
 });
}

function add(n,p){
 document.getElementById("pedido").value+=`${n} - R$ ${p}\n`;
 contador++;
 document.getElementById("cart-count").innerText=contador;
}

function toggleCarrinho(){
 document.getElementById("carrinho").classList.toggle("open");
}

function mostrarDados(t){
 document.getElementById("entregaCampos").style.display=(t==="delivery")?"block":"none";
}

function mostrarTroco(){
 document.getElementById("valorTroco").style.display=
 document.getElementById("pagamento").value==="Dinheiro"?"block":"none";
}

function enviarPedido(){
 const txt=encodeURIComponent(document.getElementById("pedido").value);
 window.open(`https://wa.me/5511943198316?text=*PEDIDO McClone*%0A${txt}`);
}

selecionar("lanches");
