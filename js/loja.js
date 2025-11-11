const selectFiltros = document.querySelector("#select-filtros")
const selectTipos = document.querySelector("#select-tipos")
const containerProdutos = document.querySelector("#container-produtos")
const selectProdutos = document.querySelector("#produtos")
const acima100 = document.querySelector("#acima-100")
const abaixo100 = document.querySelector("#abaixo-100")

const cores = document.querySelectorAll(".cor")

const divCarrinho = document.querySelector("#carrinho")
divCarrinho.classList.add("none")

const carrinhoCompra = document.querySelector("#carrinho-qtd")
const contarPreco = document.querySelector("#contar-preco")
const fecharConta = document.querySelector("#fechar-conta")
fecharConta.classList.add("hide")

const formasPagamento = document.querySelector("#formas-pagamento")
formasPagamento.classList.add("none")
formasPagamento.classList.add("hide")
const pagamento = document.querySelectorAll(".forma-pag")

const verProdutos = document.querySelector("#ver-produtos-carrinho")
const mostrarProdutosCarrinho = document.querySelector("#mostrar-produtos-carrinho")
const buttonZerarCarrinho = document.querySelector("#zerar-carrinho")

const continuarPag = document.querySelector("#continuar-pag")

const voltar = document.querySelector("#voltar-loja")

const fecharPedidoDiv = document.querySelector("#fechar-pedido")

const produtosCarrinhoBtn = document.querySelector("#mostrar-produtos-carrinho")
const containerProdutosCarrinho = document.querySelector("#container-produtos-carrinho")

const containerAviso = document.querySelector("#container-aviso")

const produtos = {
  calca: [
    { tipo: "calca", nome: "Calça cargo", cor: "preto", preco: 189.90, promocao: true, precoPromocao: 49.90, src: "calcacargopreta.jpeg" },
    { tipo: "calca", nome: "Calça streetwear", cor: "vermelho", preco: 119.90, promocao: false, src: "calcastreetwearvermelha.jpg" },
    { tipo: "calca", nome: "Calça jeans", cor: "branco", preco: 209.99, promocao: true, precoPromocao: 119.90, src: "calçajeansbranca.webp" },
    { tipo: "calca", nome: "Calça moletom", cor: "cinza", preco: 79.49, promocao: false, src: "calcamoletomcinza.webp" },
  ],

  tenis: [
    { tipo: "tenis", nome: "Tênis cargo", cor: "preto", preco: 369.90, promocao: false, src: "tenispreto.webp"},
    { tipo: "tenis", nome: "Tênis streetwear", cor: "amarelo", preco: 319.99, promocao: true, precoPromocao: 219.90, src: "tenisamarelo.jpeg" },
    { tipo: "tenis", nome: "Tênis jeans", cor: "azul", preco: 209.99, promocao: true, precoPromocao: 149.99, src: "tenisazul.webp" },
    { tipo: "tenis", nome: "Tênis moletom", cor: "branco", preco: 79.49, promocao: false, src: "tenisbranco.webp"},
  ],

  bone: [
    { tipo: "bone", nome: "Boné cargo", cor: "branco", preco: 69.99, promocao: true, precoPromocao: 44.90, src: "tenispreto.webp"},
    { tipo: "bone", nome: "Boné streetwear", cor: "azul", preco: 119.90, promocao: true, precoPromocao: 79.90, src: "tenisamarelo.jpeg" },
    { tipo: "bone", nome: "Boné jeans", cor: "preto", preco: 209.99, promocao: false, src: "tenisazul.webp" },
    { tipo: "bone", nome: "Boné moletom", cor: "vermelho", preco: 79.49, promocao: false, src: "tenisbranco.webp"},
  ],

  camisa: [
    { tipo: "camisa", nome: "Camisa cargo", cor: "azul", preco: 49.99, promocao: false, src: "tenispreto.webp"},
    { tipo: "camisa", nome: "Camisa streetwear", cor: "amarelo", preco: 79.90, promocao: false, src: "tenisamarelo.jpeg" },
    { tipo: "camisa", nome: "Camisa jeans", cor: "vermelho", preco: 129.90, promocao: false, src: "tenisazul.webp"},
    { tipo: "camisa", nome: "Camisa moletom", cor: "branco", preco: 85.49, promocao: false, src: "tenisbranco.webp"},
  ]
}

let quantidade = 0;
let precoCount = 0
let produto = 0 

const p = document.createElement("p")
p.id = "p"


fecharPedidoDiv.classList.add("none")
// FUNÇÃO PARA ADICIONAR PRODUTOS NO CARRINHO
function adicionarCarrinho(nome, quantidade, preco) {


  if(produtosCarrinhoBtn.classList.contains("none")){
    produtosCarrinhoBtn.textContent = "Mostrar produtos no carrinho"
  }

  fecharConta.classList.remove("none") 
  continuarPag.classList.add("none")

  produtosCarrinhoBtn.classList.remove("none")


  if(containerProdutosCarrinho.classList.contains("none")){
    produtosCarrinhoBtn.classList.remove("red")
    if(produtosCarrinhoBtn.classList.contains("red")){
    produtosCarrinhoBtn.textContent = "Fechar carrinho"
  }
}

  divCarrinho.style.marginTop = "2.5rem"

  fecharPedidoDiv.classList.remove("none")
  divCarrinho.classList.remove("none")

  // soma o preço ao total acumulado
  precoCount += preco;

  // mostra mensagem no carrinho
    carrinhoCompra.innerHTML = `
    Produto adicionado: ${nome} </br>
    Quantidade total: ${quantidade} ${quantidade === 1 ? "produto" : "produtos"}
  `
    p.textContent = quantidade
    document.body.appendChild(p)
  // mostra o total acumulado (não só o último preço)
  contarPreco.innerHTML = `Total: R$ ${precoCount.toFixed(2)}`

  if(!fecharConta.classList.contains("hide")){
  document.body.classList.add("bodyPadding")
  }
}


let etapa = 1; // controla se está fechando conta ou indo para pagamento

// EVENTO DE FECHAR A CONTA DOS PRODUTOS ESCOLHIDOS
fecharConta.addEventListener("click", () => {
    fecharConta.classList.add("none") 
    continuarPag.classList.remove("none")
    voltar.classList.remove("none")
    divCarrinho.style.marginTop = "4rem"
    selectProdutos.classList.add("none")

    continuarPag.classList.remove("hide")

    if(selectTipos.value === "todos"){
    containerProdutos.classList.add("none")
    } 

    else if(selectTipos.value === "calca" || selectTipos.value === "tenis" || selectTipos.value === "bone" || selectTipos.value === "camisa"){


  if (etapa === 1) {
    // Primeira etapa: mostrar total e esconder produtos
    if (quantidade === 1) {
      contarPreco.innerHTML = `Total do produto: R$ ${precoCount.toFixed(2)}`
      carrinhoCompra.innerHTML = `Quantidade de produtos: ${quantidade} produto`
    } else {
      contarPreco.innerHTML = `Total dos produtos: R$ ${precoCount.toFixed(2)}`
      carrinhoCompra.innerHTML = `Quantidade de produtos: ${quantidade} produtos`
    }

    containerProdutos.classList.add("none");
    divCarrinho.classList.add("margin");
  } 
    }
})

continuarPag.addEventListener("click", () => {
  continuarPagLogica()
})

function continuarPagLogica(){
continuarPag.classList.add("hide")
  voltar.classList.add("none")
  if(selectTipos.value === "todos"){
    console.log("caiu aqui")
  }
    logicaVoltarContinuar()
    containerProdutos.classList.add("hide")
    divCarrinho.classList.add("margin")
    formasPagamento.classList.remove("hide");
    formasPagamento.classList.remove("none");
}

voltar.addEventListener("click", () =>{
  document.body.classList.remove("bodyPadding")
  voltarLogica()
})

function voltarLogica(){
  [formasPagamento, containerProdutosCarrinho, fecharPedidoDiv, voltar].forEach((el)=>{
    el.classList.add("none")
  })
  selectTipos.selectedIndex = 0
  zerarCheckboxes()
  mostrarProdutosCarrinho.classList.remove("red")
  mostrarProdutosCarrinho.textContent = "Mostrar produtos no carrinho"
  selectProdutos.classList.remove("none")
  produtosCarrinhoBtn.classList.add("hide")
}


// EVENTO DO BOTÃO ZERAR CARRINHO
buttonZerarCarrinho.addEventListener("click", () =>{
  document.body.classList.remove("bodyPadding")
  zerarCarrinho()
})

function zerar(){
 quantidade = 0
  precoCount = 0 
  p.textContent = quantidade
  carrinhoCompra.innerHTML = "Carrinho zerado"
  contarPreco.innerHTML = `Total: R$ 0.00`
  formasPagamento.classList.add("none")
  if(quantidade <= 0) return 
}

// ZERAR CARRINHO
function zerarCarrinho(){
  containerProdutosCarrinho.classList.add("none")
  voltar.classList.add("none")
  selectProdutos.classList.remove("none")
  selectTipos.selectedIndex = 0
  zerarCheckboxes()
  fecharPedidoDiv.classList.add("none")

  if(selectTipos.value === "todos"){
    divCarrinho.style.marginTop = "0vh"
  } 
  [continuarPag, formasPagamento, fecharConta, mostrarProdutosCarrinho].forEach((el) => el.classList.add("hide"))
  containerProdutosCarrinho.innerHTML = ""
  divCarrinho.style.marginTop = "0vh"
  containerProdutos.classList.add("margin2")
  zerar()
}

// FUNÇÃO PARA CALCULAR O VALOR TOTAL DOS PRODUTOS COM BASE NA FORMA DE PAGAMENTO
function calcularPagamento(){
  pagamento.forEach((pag)=>{
    pag.addEventListener("click", ()=>{

        const descontoDeb = precoCount * 0.97
        const descontoPix = precoCount * 0.95
        const acrescimoCre = precoCount * 1.03

        carrinhoCompra.innerHTML = `Valor total: ${(precoCount).toFixed(2)}`

        switch(pag.innerHTML){
          case "DEBITO":
          contarPreco.innerHTML = `Valor total no debito: ${(descontoDeb).toFixed(2)}`
          break 

          case "PIX":
          contarPreco.innerHTML = `Valor total no pix: ${(descontoPix).toFixed(2)}`
          break 

          case "CREDITO":
          contarPreco.innerHTML = `Valor total no credito: ${(acrescimoCre).toFixed(2)}`
          break 

          case "BOLETO":
          contarPreco.innerHTML = `Valor total no boleto: ${(precoCount).toFixed(2)}`
          break 
        } 
      })
    })
  }

calcularPagamento()

// CRIANDO ESTRUTURA DOS PRODUTOS
function criarEstruturaProduto(nome, preco, imagem, cor, precoPromocao) {
  const div2 = document.createElement("div");
  div2.classList.add("produto");

  const img = document.createElement("img");
  img.classList.add("calca-img");
  img.src = `./img/${imagem}`

  const nomeProduto = document.createElement("p");
  nomeProduto.classList.add("nome-produto");
  nomeProduto.textContent = nome;

  const corProduto = document.createElement("p");
  corProduto.classList.add("cor-produto");
  corProduto.textContent = `Cor: ${cor}`

  const precoProduto = document.createElement("p");
  precoProduto.classList.add("preco");
  precoProduto.textContent = `Preço: R$${formatarPreco(preco)}`

  div2.append(img, nomeProduto, corProduto, precoProduto);

  if (precoPromocao) {
    precoProduto.classList.add("linha-preco");
    const precoProdutoPromocao = document.createElement("p");
    precoProdutoPromocao.id = "produto-promocao";
    precoProdutoPromocao.textContent = `Promoção: R$${formatarPreco(precoPromocao)}`
    div2.appendChild(precoProdutoPromocao);
  }
  return div2;
}

let armazenar = []
// FUNÇÃO QUE CRIA O BOTÃO DE ADICIONAR PRODUTO AO CARRINHO E CRIA A LOGICA DA FUNCIONALIDADE
function criarBotaoCarrinho(nome, preco, precoPromocao, cor) {
  const carrinho = document.createElement("button");
  carrinho.innerHTML = "Adicionar ao carrinho";
  carrinho.classList.add("carro");
  carrinho.id = nome

  const lista = document.createElement("li");
  lista.id = "lista";

  carrinho.addEventListener("click", () => {
    produtosCarrinhoBtn.classList.remove("hide")

    armazenar.push(carrinho.id)
    precoPromocao 
      ? verProdutosCarrinho(nome, cor, precoPromocao) 
      : verProdutosCarrinho(nome, cor, preco)
    quantidade++
    lista.innerHTML = nome;

    [divCarrinho, carrinhoCompra, contarPreco, fecharConta].forEach((el)=> el.classList.remove("hide"))
    fecharConta.innerHTML = "Fechar pedido"
    formasPagamento.classList.add("hide")

    precoPromocao
      ? adicionarCarrinho(nome, quantidade, precoPromocao) 
      : adicionarCarrinho(nome, quantidade, preco)
  });
  return carrinho;
}

// FUNÇÃO QUE MOSTRA OS PRODUTOS
function mostrarProdutos(nome, preco, imagem, precoPromocao, cor){
  const div = document.createElement("div");
  div.id = "mostrar-produtos";

  const estruturaProduto = criarEstruturaProduto(nome, preco, imagem, cor, precoPromocao);
  const botaoCarrinho = criarBotaoCarrinho(nome, preco, precoPromocao, cor);

  estruturaProduto.appendChild(botaoCarrinho);
  div.appendChild(estruturaProduto);

  containerProdutos.appendChild(div);
  return div 
}


function verProdutosCarrinho(nome, cor, preco) {
  const divVerCarrinho = document.createElement("div");
  divVerCarrinho.id = "ver-produtos-carrinho";

  const ulCarrinho = document.createElement("ul");
  ulCarrinho.classList.add("ul-carrinho");

  const item = criarItemCarrinho(nome, cor, preco);
  const botao = criarBotaoRemover(item, preco);

  item.appendChild(botao);
  ulCarrinho.appendChild(item);
  divVerCarrinho.appendChild(ulCarrinho);
  divVerCarrinho.style.backgroundColor = "red";

  containerProdutosCarrinho.appendChild(divVerCarrinho);
}

function criarItemCarrinho(nome, cor, preco) {
  const li = document.createElement("li");
  li.classList.add("lista-produtos-carrinho");
  li.textContent = `${nome}, cor: ${cor}, preço: ${formatarPreco(preco)}`
  li.dataset.nome = nome;
  li.dataset.cor = cor;
  li.dataset.preco = preco;
  return li;
}

function criarBotaoRemover(item, preco) {
  const botao = document.createElement("button");
  botao.textContent = "x";
  botao.classList.add("remover-produto");
  botao.style.backgroundColor = "green";

  botao.addEventListener("click", () => removerProduto(item, preco));
  return botao;
}

function logicaVoltarContinuar(){
    if(!containerProdutos.classList.contains("none")){
      voltar.classList.add("none")
    } else{
      voltar.classList.remove("none")
    }
    formasPagamento.classList.add("none")
}

function removerProduto(item, preco) {
  item.remove();
  precoCount -= preco;
  quantidade--;
  p.textContent = quantidade


  if (quantidade > 1) {
    carrinhoCompra.textContent = `quantidade de produtos: ${quantidade} produtos`
  } else if (quantidade === 1) {
    carrinhoCompra.textContent = `quantidade de produtos: ${quantidade} produto`
  } else {
    carrinhoCompra.textContent = `carrinho zerado`
    logicaVoltarContinuar()
  }

  if(carrinhoCompra.textContent === "carrinho zerado"){
    [continuarPag, fecharConta].forEach((el) => el.classList.add("hide"))
    continuarPag.classList.add("none")
  }

  if(quantidade === 0){
    [containerProdutosCarrinho,produtosCarrinhoBtn].forEach((el)=> el.classList.add("none"))
  }
    if (Math.abs(precoCount) < 0.01) precoCount = 0;
    contarPreco.innerHTML = `Total: R$ ${precoCount.toFixed(2)}`
}

produtosCarrinhoBtn.addEventListener("click", () => {
  containerProdutosCarrinho.classList.toggle("none")
  if(!containerProdutosCarrinho.classList.contains("none")){
    produtosCarrinhoBtn.textContent = "Fechar carrinho"
    produtosCarrinhoBtn.classList.add("red")
  } else{
    produtosCarrinhoBtn.textContent = "Mostrar produtos no carrinho"
    produtosCarrinhoBtn.classList.remove("red")
}})

// FUNÇÃO QUE EXIBE PRODUTOS COM BASE NO TIPO SELECIONADO E NO FILTRO DE PROMOÇÃO
function exibirProdutos(){
  const tipo = selectTipos.value 
  const filtro = selectFiltros.value

  if(!tipo){
    containerAviso.classList.remove("none")
    containerAviso.textContent = "selecione um produto"
    containerProdutos.classList.add("none")
    return
  } else{
    containerAviso.classList.add("none")
  }

  for(let valor in produtos){
    const produtoValue = produtos[valor]

    if(tipo === valor){

      containerProdutos.innerHTML = ""

      produtoValue.forEach((produto)=>{
        if(filtro === "promocao" && produto.promocao === true 
        || filtro === "sem-promocao" && produto.promocao === false 
        || filtro === "todos"){
        containerProdutos.classList.remove("hide")
        mostrarProdutos(produto.nome, produto.preco, produto.src, produto.precoPromocao, produto.cor)
        } 
      })
    }
  }
  limparContainerExibirMsg()
}

// FUNÇÃO PARA MOSTRAR TODOS OS PRODUTOS, QUANDO A OPÇÃO "TODOS" FOR SELECIONADA
function mostrarAll() {
  const tipo = selectTipos.value;
  const filtro = selectFiltros.value;

  if (tipo !== "todos") return;

  containerProdutos.innerHTML = "";
  containerProdutos.classList.remove("hide");

  // Percorre todas as categorias/propriedades do objeto produtos
  for (let valor in produtos) {
    const produtoValue = produtos[valor];

    produtoValue.forEach(produto => {
      // Filtra por preço acima de 100 se checkbox estiver marcado
      if (acima100.checked && produto.preco <= 100) return;

      // Filtra por preço abaixo de 100 se checkbox estiver marcado
      if (abaixo100.checked && produto.preco >= 100) return;

      // Se nenhum dos checkboxes está marcado, passa direto para o filtro promocional

      // Filtra pela promoção conforme o filtro selecionado
      if (
        filtro === "promocao" && !produto.promocao ||
        filtro === "sem-promocao" && produto.promocao
      ) {
        return; // Não mostra produto que não bate com o filtro promocional
      }

      // Se passou todos os filtros, mostra o produto
      mostrarProdutos(produto.nome, produto.preco, produto.src, produto.precoPromocao, produto.cor);
    });
  }
  limparContainerExibirMsg()
}

// FUNÇÃO PARA ZERAR CHECKBOXES
function zerarCheckboxes(){ 
  acima100.checked = false                                            
  abaixo100.checked = false                                              
}

// FUNÇÃO PARA LIMPAR O CONTAINER E EXIBIR MENSAGEM CASO O PRODUTO NÃO TENHA SIDO ENCONTRADO
function limparContainerExibirMsg(){
 if(containerProdutos.innerHTML === ""){
  containerAviso.classList.remove("none")
  containerAviso.textContent = "Não encontramos produtos nessas condições"
  containerProdutos.classList.add("hide")
  } else{
  containerAviso.classList.add("none")
  containerProdutos.classList.remove("hide")
  }
}

// FUNÇÃO PARA MOSTRAR O PRODUTO PELO SEU TIPO (CALÇA, TÊNIS, BONÉ...)
function mostrarProdutoPorTipo(){
  [formasPagamento, divCarrinho].forEach((el)=>{
    el.classList.add("none")
  })
  const tipo = selectTipos.value 
  containerProdutos.innerHTML = ""
  selectFiltros.value = ""

  for(let valor in produtos){
    const produtoValue = produtos[valor]

    produtoValue.forEach((produto)=>{
    containerProdutos.classList.remove("hide")

    if(tipo === produto.tipo){
    mostrarProdutos(produto.nome, produto.preco, produto.src, produto.precoPromocao, produto.cor)
      }
    })
}
  containerAviso.classList.add("none")

  zerarCheckboxes()
} 

// FUNÇÃO PARA ESCONDER CONTAINER DE CARRINHO
function esconderCarrinho(){
  [divCarrinho, fecharConta, formasPagamento].forEach((el)=> el.classList.add("hide"))

  divCarrinho.classList.remove("margin")
}

// EVENTOS DOS SELECTS
[selectFiltros, selectTipos].forEach((select)=>{
      select.addEventListener("change", (e)=>{
      containerProdutosCarrinho.classList.add("none")
      produtosCarrinhoBtn.classList.remove("red")
      produtosCarrinhoBtn.textContent = "Mostrar produtos no carrinho"
      divCarrinho.style.marginTop = "-30vh"
      fecharPedidoDiv.classList.add("none")
      divCarrinho.style.marginTop = "-110vh"
      containerProdutos.classList.remove("none")
      continuarPag.classList.add("hide")
      zerarCheckboxes(); // Limpa os checkboxes sempre que muda o tipo
      esconderCarrinho()
      containerProdutos.classList.remove("margin2")
      const tipo = selectTipos.value;

    if (acima100.checked || abaixo100.checked) {
      checarCheckboxes();
      return;
    }

    if (tipo === "todos") {
      mostrarAll();
    } else {
      if (e.target === selectTipos){
        mostrarProdutoPorTipo();
      } else {
        exibirProdutos();
      }
    }
  })
})

// FUNÇÃO PARA CUIDAR DA LOGICA COM BASE NO CHEKBOX ESCOLHIDO 
function verificarCheckBoxes(){
  const tipo = selectTipos.value 
  const filtro = selectFiltros.value 

  if(!tipo){
  console.log("sfdfd")
  containerAviso.classList.remove("none")
  containerAviso.textContent = "selecione um produto"
  containerProdutos.classList.add("none")
  zerarCheckboxes()
  return
  } 

  for(let valor in produtos){

  if(tipo === valor){

  const produtoValue = produtos[valor]

  const produtosAcima100 = produtoValue.filter(produto => produto.preco > 100)

  const produtosAbaixo100 = produtoValue.filter(produto => produto.preco < 100)

  containerProdutos.innerHTML = ""

  let valorCheckbox 

  if(acima100.checked){
    valorCheckbox = produtosAcima100
  } else {
    valorCheckbox = produtosAbaixo100
  } 
    valorCheckbox.forEach((produto)=>{
      if(filtro === "promocao" && produto.promocao === true 
      || filtro === "sem-promocao" && produto.promocao === false 
      || filtro === "todos" || !filtro){
      mostrarProdutos(produto.nome, produto.preco, produto.src, produto.precoPromocao, produto.cor)
          }
        limparContainerExibirMsg()
        }
      )
    }
  }
}

// FUNÇÃO QUE DECIDE OQUE VAI SER EXIBIDO COM BASE NO CHECKBOX
function checarCheckboxes(){
  if(acima100.checked || abaixo100.checked){
    esconderCarrinho()
    containerProdutos.className = ""
    divCarrinho.style.marginTop = "-20vh"
    verificarCheckBoxes()
  } else{
    mostrarProdutoPorTipo()
  } 
  if(selectTipos.value === "todos"){
    mostrarAll()
  } 
}

// EVENTOS DOS CHECKBOXES
[acima100, abaixo100].forEach((el)=>{
  el.addEventListener("change", () =>{
    el.id === "acima-100" ? abaixo100.checked = false : acima100.checked = false
    checarCheckboxes()
  })
})

// FORMATAR PREÇO NA TELA
function formatarPreco(valor){
  return Number(valor).toFixed(2).replace('.', ',');
}