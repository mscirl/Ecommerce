import { adicionarAoCarrinho } from "./menuCarrinho";
import { catalogo } from "./utilidades";

export function renderizarCatalogo() {
for (const produtosCatalogo of catalogo) {
    const cartaoProduto =  `<div class = 'class=border-solid w-48 m-2 p-2 flex flex-col justify-between shadow-lg shadow-sky-900 rounded-lg group ${produtosCatalogo.feminino ? "feminino" : "masculino"}' id="card-produto-${produtosCatalogo.id}">
    <img src="assets/img/${produtosCatalogo.nomeArquivoImagem}" alt = "Casaco Creme manga longa"
    class="hover:scale-110 duration-300 my-3 rounded-lg"
    />
    <p class= 'text-sm'>${produtosCatalogo.marca}</p>
    <p class= 'text-sm'>${produtosCatalogo.nome}</p>
    <p class= 'text-sm'>R$${produtosCatalogo.precoProduto}</p>
    <button id='adicionar-${produtosCatalogo.id}' class= "bg-sky-500 hover:bg-sky-900"><i class="fa-solid fa-cart-plus" style="color:#f3f4f5;"></i></button>
    </div>`;

document.getElementById("container-produto").innerHTML += cartaoProduto;
}

for (const produtosCatalogo of catalogo) {
    document
    .getElementById(`adicionar-${produtosCatalogo.id}`)
    .addEventListener("click", () => adicionarAoCarrinho(produtosCatalogo.id));
}
}