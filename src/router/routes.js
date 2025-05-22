const routes = [
  {
    path: '/',
    component: () => import('layouts/LayoutPrincipal.vue'),
    children: [
      { path: '', component: () => import('pages/PaginaDashboard.vue') },

      // Rotas de Clientes
      { path: 'clientes', component: () => import('pages/PaginaClientes.vue') },
      { path: 'clientes/novo', component: () => import('pages/NovoCliente.vue') },
      { path: 'clientes/editar/:id', component: () => import('pages/EditarCliente.vue') },
      { path: 'clientes/detalhes/:id', component: () => import('pages/DetalhesCliente.vue') },

      // Rotas de Produtos
      { path: 'produtos', component: () => import('pages/PaginaProdutos.vue') },
      { path: 'produtos/novo', component: () => import('pages/NovoProduto.vue') },
      { path: 'produtos/editar/:id', component: () => import('pages/EditarProduto.vue') },
      { path: 'produtos/detalhes/:id', component: () => import('pages/DetalhesProduto.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/PaginaErro.vue'),
  },
]

export default routes
