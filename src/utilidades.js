export const catalogo = [
    {
        id: "1",
        nome: "Camisa creme",
        marca: "Magazine Hashtag",
        precoProduto: 150,
        nomeArquivoImagem: "product-1.jpg",
        feminino: false,
    },
    {
        id: "2",
        nome: "Sobretudo preto",
        marca: "Magazine Hashtag",
        precoProduto: 230,
        nomeArquivoImagem: "product-2.jpg",
        feminino: true,
    },
    {
        id: "3",
        nome: "Casaco de camurça marrom",
        marca: "Magazine Hashtag",
        precoProduto: 180,
        nomeArquivoImagem: "product-3.jpg",
        feminino: false,
    },
    {
        id: "4",
        nome: "Casaco de inverno preto",
        marca: "Magazine Hashtag",
        precoProduto: 230,
        nomeArquivoImagem: "product-4.jpg",
        feminino: false,
    },
    {
        id: "5",
        nome: "Jaqueta de inverno preta",
        marca: "Magazine Hashtag",
        precoProduto: 180,
        nomeArquivoImagem: "product-5.jpg",
        feminino: false,
    },
    {
        id: "6",
        nome: "Sobretudo Bege",
        marca: "Magazine Hashtag",
        precoProduto: 299,
        nomeArquivoImagem: "product-6.jpg",
        feminino: true,
    },
    {
        id: "7",
        nome: "Sobretudo preto",
        marca: "Magazine Hashtag",
        precoProduto: 220,
        nomeArquivoImagem: "product-7.jpg",
        feminino: true,
    },
    {
        id: "8",
        nome: "Sobretudo creme sem mangas",
        marca: "Magazine Hashtag",
        precoProduto: 170,
        nomeArquivoImagem: "product-8.jpg",
        feminino: true,
    }
];

export function salvarLocalStorage(chave, informacao) {
    localStorage.setItem(chave, JSON.stringify(informacao));
  }
  
export function lerLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave));
  }
  
export function apagarDoLocalStorage(chave) {
    localStorage.removeItem(chave);
  }
  
export function desenharProdutoCarrinhoSimples (idProduto, idContainerHTML, quantidadeProduto) {
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinho = document.getElementById(idContainerHTML);
        
    const elementoArticle = document.createElement("article");
    const articleClasses = ["flex", "flex-wrap","bg-gray-200", "rounded-lg", "relative","mb-2"];
    for (const articleClass of articleClasses) {
            elementoArticle.classList.add(articleClass);
        }
        
    const cartaoProdutoCarrinho = `
    <img src="./assets/img/${produto.nomeArquivoImagem}" alt="Carrinho: ${produto.nome}" class="h-24 rounded-lg p-4"/>
    <div class="p-2 flex flex-col justify-between">
        <p class="text-slate-900 text-sm">${produto.nome}</p>
        <p class="text-slate-400 text-xs">Tamanho: G</p>
        <p class="text-green-600" text-lg>R$${produto.precoProduto}</p>
    </div>
    <div class="flex text-slate-950 items-end absolute bottom-0 right-2 p-2 text-lg">
        <p id="quantidade-${produto.id}" class="ml-2"> ${quantidadeProduto}</p>
    </div>`;


    

    elementoArticle.innerHTML = cartaoProdutoCarrinho;
    containerProdutosCarrinho.appendChild(elementoArticle);
  }

