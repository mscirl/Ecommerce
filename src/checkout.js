import { desenharProdutoCarrinhoSimples, lerLocalStorage, salvarLocalStorage, apagarDoLocalStorage } from "./utilidades";
import {atualizarPrecoCarrinho } from "./menuCarrinho"

function desenharProdutosCheckout() {
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho");
    for (const idProduto in idsProdutoCarrinhoComQuantidade) {
      desenharProdutoCarrinhoSimples(idProduto, "container-produtos-checkout", idsProdutoCarrinhoComQuantidade[idProduto]);
    }
  }

  atualizarPrecoCarrinho ();
  document.addEventListener("submit",(evt) => finalizarCompra(evt));

  function finalizarCompra(evento) {
    evento.preventDefault();
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
      return;
    }
    const dataAtual = new Date()
    const pedidoFeito = {
      dataPedido: dataAtual,
      pedido: idsProdutoCarrinhoComQuantidade,
    };
  
    const historicoDePedidos = lerLocalStorage("historico") ?? [];
    const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];
  
    salvarLocalStorage("historico", historicoDePedidosAtualizado);
    apagarDoLocalStorage("carrinho");
  
    window.location.href = window.location.origin + "/pedidos.html";
  
  }
   
  desenharProdutosCheckout();
  finalizarCompra ();
 

  
