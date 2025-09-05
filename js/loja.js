const selectFiltros = document.querySelector("#select-filtros")
const selectTipos = document.querySelector("#select-tipos")
const containerProdutos = document.querySelector("#container-produtos")
const acima100 = document.querySelector("#acima-100")
const abaixo100 = document.querySelector("#abaixo-100")

const cores = document.querySelectorAll(".cor")

const divCarrinho = document.querySelector("#carrinho")
const carrinhoCompra = document.querySelector("#carrinho-qtd")
const contarPreco = document.querySelector("#contar-preco")
const fecharConta = document.querySelector("#fechar-conta")
fecharConta.classList.add("hide")

const formasPagamento = document.querySelector("#formas-pagamento")
const pagamento = document.querySelectorAll(".forma-pag")

const verProdutos = document.querySelector("#ver-produtos-carrinho")
const mostrarProdutosCarrinho = document.querySelector("#mostrar-produtos-carrinho")
const buttonZerarCarrinho = document.querySelector("#zerar-carrinho")

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


let precoCount = 0;
let produto = 0 

// FUNÇÃO PARA ADICIONAR PRODUTOS NO CARRINHO
function adicionarCarrinho(nome, quantidade, preco) {
  // soma o preço ao total acumulado
  precoCount += preco;

  // mostra mensagem no carrinho
  if (quantidade === 1) {
    carrinhoCompra.innerHTML = `
      Produto adicionado: ${nome} </br>
      Quantidade de produtos: ${quantidade} produto
    `;
  } else {
    carrinhoCompra.innerHTML = `
      Produto adicionado: ${nome} </br>
      Quantidade de produtos: ${quantidade} produtos
    `;
  }
 
  // mostra o total acumulado (não só o último preço)
  contarPreco.innerHTML = `Total: R$ ${precoCount.toFixed(2)}`;

  fecharConta.addEventListener("click", () =>{
  
  if(quantidade === 1){
  contarPreco.innerHTML = `Total do produto: R$ ${precoCount.toFixed(2)}`;
  carrinhoCompra.innerHTML = `Quantidade de produtos: ${quantidade} produto`
  } else{
  contarPreco.innerHTML = `Total dos produtos: R$ ${precoCount.toFixed(2)}`
  carrinhoCompra.innerHTML = `Quantidade de produtos: ${quantidade} produtos`
  containerProdutos.classList.add("hide")
  }
  formasPagamento.classList.add("hide")
  divCarrinho.classList.add("margin")
  containerProdutos.classList.add("hide")

  fecharConta.innerHTML = "Continuar para o pagamento"
  fecharConta.addEventListener("click", () =>{

  formasPagamento.classList.remove("hide")  
    })
  })
}

let quantidade = 0;

// EVENTO DO BOTÃO ZERAR CARRINHO
buttonZerarCarrinho.addEventListener("click", () =>{
  zerarCarrinho()
  verProdutos.classList.add("hide")
  formasPagamento.classList.add("hide")
  fecharConta.classList.add("hide")
  quantidade = 0
  precoCount = 0
})

// ZERAR CARRINHO
function zerarCarrinho(){
  carrinhoCompra.innerHTML = "Quantidade de produtos: 0"
  contarPreco.innerHTML = `Total: R$ 0`
  formasPagamento.classList.add("hide")
  if(quantidade <= 0) return 
  quantidade--
}

/*
function verProdutosCarrinho(nome, quantidade, preco){
  verProdutos.addEventListener("click", () =>{
  console.log(`produto: ${nome}`)
  mostrarProdutosCarrinho.innerHTML = `produto: ${nome}`
  })
}
*/

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

// FUNÇÃO QUE CRIA OS ELEMENTOS E MOSTRA OS PRODUTOS
function mostrarProdutos(nome, preco, imagem, precoPromocao, cor) {
  const div = document.createElement("div");
  div.id = "mostrar-produtos";

  const div2 = document.createElement("div");
  div2.classList.add("produto")

  const carrinho = document.createElement("button")
  carrinho.innerHTML = "Adicionar ao carrinho"
  carrinho.classList.add("carro")

  const lista = document.createElement("li")
  lista.id = "lista"

  carrinho.addEventListener("click", () => {
    quantidade++;
    lista.innerHTML = nome 
    divCarrinho.classList.remove("hide")
    carrinhoCompra.classList.remove("hide")
    contarPreco.classList.remove("hide")

    fecharConta.classList.remove("hide")
    fecharConta.innerHTML = "Fechar pedido"
    formasPagamento.classList.add("hide")

    precoPromocao ? adicionarCarrinho(nome, quantidade, precoPromocao) 
    : adicionarCarrinho(nome, quantidade, preco)

  });
  console.log(lista)

  /*verProdutosCarrinho(nome)*/
  
  const img = document.createElement("img");
  img.classList.add("calca-img");
  img.src = `./img/${imagem}`;

  const nomeProduto = document.createElement("p");
  nomeProduto.classList.add("nome-produto");
  nomeProduto.textContent = nome;

  const corProduto = document.createElement("p");
  corProduto.classList.add("cor-produto");
  corProduto.textContent = `Cor: ${cor}`;

  const precoProduto = document.createElement("p");
  precoProduto.classList.add("preco");
  precoProduto.textContent = `Preço: R$${formatarPreco(preco)}`;

  div2.appendChild(img);
  div2.appendChild(nomeProduto);
  div2.appendChild(corProduto);
  div2.appendChild(precoProduto);

  if (precoPromocao) {
    precoProduto.classList.add("linha-preco");

    const precoProdutoPromocao = document.createElement("p");
    precoProdutoPromocao.id = "produto-promocao";
    precoProdutoPromocao.textContent = `Promoção: R$${formatarPreco(precoPromocao)}`;
    div2.appendChild(precoProdutoPromocao);
  }

  div.appendChild(div2);
  div2.appendChild(carrinho)

  containerProdutos.appendChild(div);
}

// FUNÇÃO QUE EXIBE PRODUTOS COM BASE NO TIPO SELECIONADO E NO FILTRO DE PROMOÇÃO
function exibirProdutos(){
  const tipo = selectTipos.value 
  const filtro = selectFiltros.value

  if(!tipo){
    alert("selecione um produto")
    containerProdutos.classList.add("hide")
    return
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
}

// FUNÇÃO PARA ZERAR CHECKBOXES
function zerarCheckboxes(){ 
  acima100.checked = false                                            
  abaixo100.checked = false                                              
}

// FUNÇÃO PARA LIMPAR O CONTAINER E EXIBIR MENSAGEM CASO O PRODUTO NÃO TENHA SIDO ENCONTRADO
function limparContainerExibirMsg(){
 if(containerProdutos.innerHTML === ""){
  alert("n encontramos produtos nessas condições")
  containerProdutos.classList.add("hide")
  } else{
  containerProdutos.classList.remove("hide")
  }
}

// FUNÇÃO PARA MOSTRAR O PRODUTO PELO SEU TIPO (CALÇA, TÊNIS, BONÉ...)
function mostrarProdutoPorTipo(){

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
  zerarCheckboxes()
} 

// FUNÇÃO PARA ESCONDER CONTAINER DE CARRINHO
function esconderCarrinho(){
 divCarrinho.classList.add("hide")
  fecharConta.classList.add("hide")
  divCarrinho.classList.remove("margin")
  formasPagamento.classList.add("hide")
}

// EVENTOS DOS SELECTS
[selectFiltros, selectTipos].forEach((select)=>{
    select.addEventListener("change", (e)=>{
      zerarCheckboxes(); // Limpa os checkboxes sempre que muda o tipo
      esconderCarrinho()

      const tipo = selectTipos.value;

    if (acima100.checked || abaixo100.checked) {
      checarCheckboxes();
      return;
    }

    if (tipo === "todos") {
      mostrarAll();
    } else {
      if (e.target === selectTipos) {
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
  alert("selecione um produto")
  containerProdutos.classList.add("hide")
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
        }
      )
    }
  }
}

// FUNÇÃO QUE DECIDE OQUE VAI SER EXIBIDO COM BASE NO CHECKBOX
function checarCheckboxes(){
  if(acima100.checked || abaixo100.checked){
    verificarCheckBoxes()
    esconderCarrinho()
  } else{
    mostrarProdutoPorTipo()
  } 

  if(selectTipos.value === "todos"){
    console.log("AQUI!")
    mostrarAll()
  } 

  limparContainerExibirMsg()
}

// EVENTOS DOS CHECKBOXES
acima100.addEventListener("change", () => {
  abaixo100.checked = false 
  cores.forEach((c)=> c.classList.remove("select"))
  checarCheckboxes()
})

abaixo100.addEventListener("change", () => {
  acima100.checked = false 
  cores.forEach((c)=> c.classList.remove("select"))
  checarCheckboxes() 
})

// FORMATAR PREÇO 
function formatarPreco(valor){
  return Number(valor).toFixed(2).replace('.', ',');
}



