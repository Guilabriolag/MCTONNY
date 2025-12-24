// Cardápio completo organizado por categorias [cite: 14, 22-66]
const cardapio = {
  lanches: [
    { n: "1 - DOG SIMPLES", p: 16.00, d: "Salsicha, queijo, milho, batata palha, ketchup e maionese" },
    { n: "2 - DOG EGG", p: 21.00, d: "Salsicha, ovo, queijo, milho, batata palha, ketchup e maionese" },
    { n: "6 - DOG BACON", p: 21.00, d: "Salsicha, bacon, queijo, milho, batata palha, ketchup e maionese" },
    { n: "17 - X-EGG", p: 21.00, d: "Hambúrguer, ovo, queijo, presunto, maionese e ketchup" },
    { n: "20 - X-SALADA", p: 20.00, d: "Hambúrguer, queijo, alface, tomate, maionese e ketchup" },
    { n: "21 - X-TUDO", p: 28.00, d: "Hambúrguer, calabresa, bacon, salame, queijo, ovo, salada e ketchup" },
    { n: "30 - MC TITAN", p: 90.00, d: "3 hambúrgueres, calabresa, bacon, salame, 3 salsichas, 3 ovos, queijo, fritas + Kuat 2L" }
  ],
  porcoes: [
    { n: "44 - MC PORÇÃO", p: 65.00, d: "Batata frita, calabresa, bacon e cheddar + Kuat 2L" },
    { n: "45 - BATATA COM CHEDDAR", p: 35.00, d: "Batata frita crocante com cobertura de cheddar" },
    { n: "46 - CALABRESA ACEBOLADA", p: 40.00, d: "Porção de calabresa com cebola" }
  ],
  beirutes: [
    { n: "31 - Beirute de Hambúrguer", p: 40.00, d: "Hambúrguer, calabresa, bacon, ovo, salame, queijo e salada" },
    { n: "33 - Beirute de Frango", p: 38.00, d: "Frango desfiado, queijo, presunto, alface, tomate e maionese" }
  ],
  bebidas: [
    { n: "Coca-Cola Lata", p: 6.00, d: "350ml" },
    { n: "Coca-Cola 2L", p: 12.00, d: "Gelada" },
    { n: "Guaraná Kuat 2L", p: 10.00, d: "Gelada" }
  ]
};

let categoriaAtual = "lanches";
let itensPedido = [];
let totalProdutos = 0;
let taxaEntrega = 0;
let tipoPedido = "retirar";

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  selecionar("lanches"); [cite: 20]
});

function selecionar(cat) {
  categoriaAtual = cat;
  document.querySelectorAll(".btn-nav").forEach(b => b.classList.remove("active"));
  document.getElementById("btn-" + cat).classList.add("active"); [cite: 15]
  render(); [cite: 16]
}

function render() {
  const box = document.getElementById("sabores");
  box.innerHTML = "";
  cardapio[categoriaAtual].forEach(item => {
    box.innerHTML += `
      <div class="item-card">
        <h3>${item.n}</h3>
        <p>${item.d}</p>
        <span class="preco">R$ ${item.p.toFixed(2)}</span>
        <button class="btn-add" onclick="add('${item.n}', ${item.p})">ADICIONAR AO PEDIDO</button>
      </div>`;
  }); [cite: 16]
}

function add(nome, preco) {
  itensPedido.push({ nome, preco });
  totalProdutos += preco;
  atualizarInterface();
  alerta("Adicionado!", `${nome} foi incluído.`); [cite: 17, 20]
}

function atualizarInterface() {
  document.getElementById("cart-count").innerText = itensPedido.length;
  
  // Atualiza a lista de texto no textarea
  const resumo = itensPedido.map(i => `• ${i.nome} - R$ ${i.preco.toFixed(2)}`).join('\n');
  document.getElementById("pedido").value = resumo;
  
  atualizarTotalFinal(); [cite: 17]
}

function atualizarTotalComTaxa() {
  const selectBairro = document.getElementById("bairro");
  taxaEntrega = parseFloat(selectBairro.value) || 0;
  atualizarTotalFinal();
}

function atualizarTotalFinal() {
  const totalGeral = totalProdutos + taxaEntrega;
  document.getElementById("total-valor").innerText = totalGeral.toFixed(2);
}

function mostrarDados(tipo) {
  tipoPedido = tipo;
  document.getElementById("entregaCampos").style.display = tipo === "delivery" ? "block" : "none"; [cite: 18]
  
  document.getElementById("btn-retirar").classList.toggle("active", tipo === "retirar");
  document.getElementById("btn-delivery").classList.toggle("active", tipo === "delivery");
  
  if (tipo === "retirar") {
    taxaEntrega = 0;
    document.getElementById("bairro").value = "0";
  }
  atualizarTotalFinal(); [cite: 19]
}

function mostrarTroco() {
  const pag = document.getElementById("pagamento").value;
  document.getElementById("valorTroco").style.display = pag === "Dinheiro" ? "block" : "none"; [cite: 19]
}

function editarPedido() {
  itensPedido = [];
  totalProdutos = 0;
  taxaEntrega = 0;
  document.getElementById("obs").value = "";
  atualizarInterface(); [cite: 17]
}

function toggleCarrinho() {
  document.getElementById("carrinho").classList.toggle("open"); [cite: 18]
}

function enviarPedido() {
  if (itensPedido.length === 0) {
    alerta("Erro", "Seu carrinho está vazio!");
    return;
  }

  const obs = document.getElementById("obs").value;
  const pag = document.getElementById("pagamento").value;
  const totalGeral = totalProdutos + taxaEntrega;
  
  let msg = `*NOVO PEDIDO - MCTONNY*\n\n`;
  msg += `*ITENS:*\n${document.getElementById("pedido").value}\n\n`;
  
  if(obs) msg += `*OBS:* ${obs}\n`;
  msg += `\n*TOTAL:* R$ ${totalGeral.toFixed(2)}`;
  msg += `\n*PAGAMENTO:* ${pag}`;
  
  if(tipoPedido === "delivery") {
    const end = document.getElementById("endereco").value;
    const bairroNome = document.getElementById("bairro").options[document.getElementById("bairro").selectedIndex].text;
    msg += `\n\n*ENTREGA:* ${end}\n*BAIRRO:* ${bairroNome}`;
  } else {
    msg += `\n\n*RETIRADA NO LOCAL*`;
  }

  if(pag === "Dinheiro") {
    const troco = document.getElementById("valorTroco").value;
    msg += `\n*TROCO PARA:* R$ ${troco}`;
  }

  const fone = "5511943198316"; [cite: 20]
  window.open(`https://wa.me/${fone}?text=${encodeURIComponent(msg)}`); [cite: 20]
}

function alerta(t, m) {
  document.getElementById("alert-title").innerText = t;
  document.getElementById("alert-msg").innerText = m;
  document.getElementById("custom-alert-overlay").style.display = "flex";
}

function fecharAlerta() {
  document.getElementById("custom-alert-overlay").style.display = "none";
}
