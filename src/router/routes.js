// src/router/routes.js
const routes = [
  {
    path: '/',
    component: () => import('layouts/LayoutPrincipal.vue'),
    children: [
      { path: '', component: () => import('pages/PaginaDashboard.vue') },
      { path: 'clientes', component: () => import('pages/PaginaClientes.vue') },
      { path: 'clientes/novo', component: () => import('pages/NovoCliente.vue') },
      { path: 'clientes/editar/:id', component: () => import('pages/EditarCliente.vue') },
      { path: 'clientes/detalhes/:id', component: () => import('pages/DetalhesCliente.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/PaginaErro.vue'),
  },
]

export default routes
