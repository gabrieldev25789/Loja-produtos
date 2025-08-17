const selectFiltros = document.querySelector("#select-filtros")
const selectTipos = document.querySelector("#select-tipos")
const containerProdutos = document.querySelector("#container-produtos")
const acima100 = document.querySelector("#acima-100")
const abaixo100 = document.querySelector("#abaixo-100")

const cores = document.querySelectorAll(".cor")

const carrinho = document.querySelector("#carrinho-qtd")
const contarPreco = document.querySelector("#contar-preco")
const fecharConta = document.querySelector("#fechar-conta")
fecharConta.classList.add("hide")

const formasPagamento = document.querySelector("#formas-pagamento")
const pagamento = document.querySelectorAll(".forma-pag")

const verProdutos = document.querySelector("#ver-produtos-carrinho")
const mostrarProdutosCarrinho = document.querySelector("#mostrar-produtos-carrinho")

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

/*function mostrarProdutoPorCor(){
  cores.forEach((cor) => {
    cor.addEventListener("click", () => {
      cores.forEach((c) => c.classList.remove("select"));
      cor.classList.add("select");

      const tipo = selectTipos.value;
      const filtro = selectFiltros.value; // (não está sendo usado aqui ainda)
      const corId = cor.id;

      if (!tipo) {
        alert("Por favor selecione um produto");
        cores.forEach((c) => c.classList.remove("select"));
        return;
      }

      containerProdutos.innerHTML = ""; // Limpa os produtos anteriores

      for (let valor in produtos) {
        const produtosValue = produtos[valor];

        const filtrados = produtosValue.filter((produto) =>
          produto.tipo === tipo &&
          produto.cor === corId 
        )

        filtrados.forEach((produto) => {
          containerProdutos.classList.remove("hide")
          mostrarProdutos(
            produto.nome,
            produto.preco,
            produto.src,
            produto.precoPromocao,
            produto.cor
          );
        });
      }
      if(containerProdutos.innerHTML === ""){
         limparContainerExibirMsg()
        }
    });
  });
}
mostrarProdutoPorCor() */



let precoCount = 0;
let produto = 0 

function adicionarCarrinho(nome, quantidade, preco) {
  // soma o preço ao total acumulado
  precoCount += preco;

  // mostra mensagem no carrinho
  if (quantidade === 1) {
    carrinho.innerHTML = `
      Produto adicionado: ${nome} </br>
      Quantidade de produtos: ${quantidade} produto
    `;
  } else {
    carrinho.innerHTML = `
      Produto adicionado: ${nome} </br>
      Quantidade de produtos: ${quantidade} produtos
    `;
  }

  // mostra o total acumulado (não só o último preço)
  contarPreco.innerHTML = `Total: R$ ${precoCount.toFixed(2)}`;

  fecharConta.addEventListener("click", () =>{
  
  if(quantidade === 1){
  contarPreco.innerHTML = `Total do produto: R$ ${precoCount.toFixed(2)}`;
  carrinho.innerHTML = `Quantidade de produtos: ${quantidade} produto`
  } else{
  contarPreco.innerHTML = `Total dos produtos: R$ ${precoCount.toFixed(2)}`
  carrinho.innerHTML = `Quantidade de produtos: ${quantidade} produtos`
  }

  fecharConta.innerHTML = "Continuar para o pagamento"
  fecharConta.addEventListener("click", () =>{
  formasPagamento.classList.remove("hide")
  fecharConta.innerHTML = "Zerar Carrinho"
    })
  })
}


function verProdutosCarrinho(nome, quantidade, preco){
  
  verProdutos.addEventListener("click", () =>{
 
  console.log(`produto: ${nome}`)
  mostrarProdutosCarrinho.innerHTML = `produto: ${nome}`
  })
}


let array = [];
let quantidade = 0;

function calcularPagamento(){

  pagamento.forEach((pag)=>{
    pag.addEventListener("click", ()=>{

        const descontoDeb = precoCount * 0.97
        const descontoPix = precoCount * 0.95
        const acrescimoCre = precoCount * 1.03
        
        carrinho.innerHTML = `Valor total: ${(precoCount).toFixed(2)}`

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
          contarPreco.innerHTML = `Valor Total no boleto: ${(precoCount).toFixed(2)}`
          break 
        } 

      })
    })
  }
calcularPagamento()


function mostrarProdutos(nome, preco, imagem, precoPromocao, cor) {
  const div = document.createElement("div");
  div.id = "mostrar-produtos";

  const div2 = document.createElement("div");
  div2.classList.add("produto")

  const carrinho = document.createElement("button")
  carrinho.innerHTML = "Adicionar ao carrinho"
  carrinho.classList.add("carro")

  carrinho.addEventListener("click", () => {
    quantidade++;
    console.log(quantidade, nome, preco, precoPromocao);

    if(precoPromocao){
    adicionarCarrinho(nome, quantidade, precoPromocao);
    fecharConta.classList.remove("hide")
    fecharConta.innerHTML = "Fechar pedido"
    formasPagamento.classList.add("hide")
    } 
    else{
    adicionarCarrinho(nome, quantidade, preco);
    fecharConta.classList.remove("hide")
    fecharConta.innerHTML = "Fechar pedido"
    formasPagamento.classList.add("hide")
    }
  });

  verProdutosCarrinho(nome)
  

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

function zerarCheckboxes(){ 
  acima100.checked = false                                            
  abaixo100.checked = false                                              
}

function limparContainerExibirMsg(){
 if(containerProdutos.innerHTML === ""){
  alert("n encontramos produtos nessas condições")
  containerProdutos.classList.add("hide")
  } else{
  containerProdutos.classList.remove("hide")
  }
}

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
  
cores.forEach((c) => c.classList.remove("select"))
  zerarCheckboxes()
} 

selectTipos.addEventListener("change", () => {
  cores.forEach((c) => c.classList.remove("select"));
  zerarCheckboxes(); // Limpa os checkboxes sempre que muda o tipo

  const tipo = selectTipos.value;

  if (acima100.checked || abaixo100.checked) {
    checarCheckboxes();
    return;
  }

  if (tipo === "todos") {
    mostrarAll();
  } else {
    mostrarProdutoPorTipo();
  }
});

selectFiltros.addEventListener("change", () => {
  cores.forEach((c) => c.classList.remove("select"));
  zerarCheckboxes(); // Evita conflito entre filtros e checkboxes

  const tipo = selectTipos.value;

  if (acima100.checked || abaixo100.checked) {
    checarCheckboxes();
    return;
  }

  if (tipo === "todos") {
    mostrarAll();
  } else {
    exibirProdutos();
  }
});

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

function checarCheckboxes(){
  if(acima100.checked || abaixo100.checked){
    verificarCheckBoxes()
  } else{
    mostrarProdutoPorTipo()
  } 

  if(selectTipos.value === "todos"){
    console.log("AQUI!")
    mostrarAll()
  } 

  limparContainerExibirMsg()
}

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

function formatarPreco(valor){
  return Number(valor).toFixed(2).replace('.', ',');
}




