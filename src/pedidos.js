import { lerLocalStorage, desenharProdutoCarrinhoSimples } from './utilidades';

export  function criarPedidoHistorico(pedidoComData) {
    const elementoPedido = `<p class="text-lg text-bold my-9">${new Date(pedidoComData.dataPedido).toLocaleDateString("pt-BR", {hour: "2-digit", minute: "2-digit"})}</p>
    <section id="container-pedidos-${pedidoComData.dataPedido}"class= "justify-self-auto p-2 h-50 w-80 flex flex-col w-50 capitalize rounded-md border border-gray-300 relative"></section>`;
    const main = document.getElementsByTagName("main")[0];
    main.innerHTML += elementoPedido;
  
    for (const idProduto in pedidoComData.pedido) {
      desenharProdutoCarrinhoSimples(idProduto, `container-pedidos-${pedidoComData.dataPedido}`, pedidoComData.pedido[idProduto]);
    }
  }

export  function renderizarHistoricoPedidos() {
    // const historicoArray =  [..."historico"];
    // for (const pedidoComData of historicoArray); {
    //   criarPedidoHistorico(pedidoComData);
    // } 

    const historico = lerLocalStorage("historico");
    for (var i = 0; i < historico.length; i++) {
      criarPedidoHistorico(historico[i]);
    }
  }

  renderizarHistoricoPedidos();
  
