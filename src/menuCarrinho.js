import { catalogo, lerLocalStorage, salvarLocalStorage } from "./utilidades";

const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
                                                                
function abrirCarrinho(){
    document.getElementById("carrinho").classList.add("right-[0px]");
    document.getElementById("carrinho").classList.remove("right-[-360px]");
    }
    
function fecharCarrinho(){
    document.getElementById("carrinho").classList.remove("right-[0px]");
    document.getElementById("carrinho").classList.add("right-[-360px]");
    }

function irParaCheckout() {
        if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
          return;
        }
        window.location.href = window.location.origin + "/checkout.html";
      }
    
export function inicializarCarrinho () {
        const botaoFecharCarrinho = document.getElementById("fecha-carrinho")
        const botaoAbrirCarrinho = document.getElementById("abre-carrinho")
        const botaoIrParaCheckout = document.getElementById("finalizar-compra")
        
        botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
        botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
        botaoIrParaCheckout.addEventListener("click", irParaCheckout);
    }

function removerDoCarrinho (idProduto) {
    delete idsProdutoCarrinhoComQuantidade[idProduto];
    salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
    renderizarProdutosCarrinho();
    }

function desenharProdutoNoCarrinho (idProduto){
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinho =
        document.getElementById("produtos-carrinho");
        
    const elementoArticle = document.createElement("article");
    const articleClasses = ["flex", "bg-slate-800", "rounded-lg", "p-1", "relative", "mb-2"];

        for (const articleClass of articleClasses) {
            elementoArticle.classList.add(articleClass);
        }
        
    const cartaoProdutoCarrinho = `<button id="remover-item-${produto.id}" class="p-2 absolute right-0">
          <i class="fa-solid fa-circle-xmark" style="color: #fb7e8e;"></i>
        </button>
        <img src="./assets/img/${produto.nomeArquivoImagem}" alt="Carrinho: ${produto.nome}" class="h-24 rounded-lg p-4"
        />
        <div class="py-3 flex flex-col justify-between">
        <p class="text-sm">${produto.nome}</p>
    <p class="text-slate-400 text-sm">Tamanho: G</p>
    <p class="text-green-600">R$${produto.precoProduto}</p>
   </div>
   <div class="flex items-end absolute bottom-0 right-2 p-2 text-lg">
     <button id="decrementar-produto-${produto.id}"> - </button>
        <p id="quantidade-${produto.id}" class="ml-2"> ${idsProdutoCarrinhoComQuantidade[produto.id]} </p>
     <button class="ml-2" id="incrementar-produto-${produto.id}"> + </button>
   </div>`;
    
   elementoArticle.innerHTML = cartaoProdutoCarrinho;
   containerProdutosCarrinho.appendChild(elementoArticle);

document
    .getElementById(`decrementar-produto-${produto.id}`)
    .addEventListener("click", () => decrementarQuantidadeProduto(produto.id));

document
    .getElementById(`incrementar-produto-${produto.id}`)
    .addEventListener("click", () => incrementarQuantidadeProduto(produto.id));

document
    .getElementById(`remover-item-${produto.id}`)
    .addEventListener("click", () => removerDoCarrinho(produto.id));
    }

export function renderizarProdutosCarrinho () {
    const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");
    containerProdutosCarrinho.innerHTML = "";
    atualizarPrecoCarrinho();

    for (const idProduto in idsProdutoCarrinhoComQuantidade){
    desenharProdutoNoCarrinho(idProduto);
}
}

function incrementarQuantidadeProduto (idProduto){
    idsProdutoCarrinhoComQuantidade[idProduto]++;
    salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeProduto (idProduto){
    if (idsProdutoCarrinhoComQuantidade[idProduto] === 1){
        removerDoCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto]--;
    salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
    atualizarInformacaoQuantidade (idProduto);
    atualizarPrecoCarrinho();
}

function atualizarInformacaoQuantidade (idProduto){
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto];
}

export function adicionarAoCarrinho(idProduto){
        if (idProduto in idsProdutoCarrinhoComQuantidade){
            incrementarQuantidadeProduto(idProduto);
            return;
        }
        idsProdutoCarrinhoComQuantidade[idProduto] = 1;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  desenharProdutoNoCarrinho(idProduto);
  atualizarPrecoCarrinho();
}

export function atualizarPrecoCarrinho() {
    const precoCarrinho = document.getElementById("preco-total");
    let precoTotalCarrinho = 0;
    for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
      precoTotalCarrinho += catalogo.find(p => p.id === idProdutoNoCarrinho).precoProduto * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
    }
    precoCarrinho.innerText = `Total: R$${precoTotalCarrinho}`;
  }