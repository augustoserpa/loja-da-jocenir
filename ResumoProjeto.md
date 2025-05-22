Resumo do Projeto "Loja da Jocenir"

📁 Estrutura de Pastas

Projeto baseado em Vue 3 e Quasar Framework, com organização personalizada em português:

src/components: Componentes reutilizáveis como CardCliente.vue, FormularioCliente.vue

src/composables: Funções reutilizáveis com lógica (ex: useClientes.js)

src/css: Estilos personalizados com quasar.variables.scss e tema.scss

src/layouts: Layout base (principalmente LayoutPrincipal.vue)

src/pages: Telas principais (ex: PaginaClientes.vue, NovoCliente.vue, etc.)

src/router: Roteamento da aplicação (routes.js, index.js)

🎨 Design Geral

Fonte: Amatic SC (com estilo informal e personalizado)

Cores:

verde-musgo: #686230

verde-oliva: #a2a183

marrom-avermelhado: #8c4d2e

bege-claro: #ede6d5

Layout principal:

Cabeçalho fixo com nome da loja e menu hamburguer

Menu suspenso com opção de logout

Rodapé com 5 abas: Clientes, Produtos, Vendas (em destaque), Relatórios, Promover

👥 Funcionalidades da Página de Clientes

Listagem em cards com:

Nome

Telefone

Última venda (valor e data)

Saldo em aberto (se houver)

Botão com menu de 3 pontinhos:

Editar

Ver detalhes

Remover

Campo de filtro por nome

Botão de adicionar novo cliente

Formulário reutilizável com campos:

Nome, Telefone, Email, Instagram, Endereço, Observações

Página de edição reutiliza o mesmo formulário com dados preenchidos

Página de detalhes já preparada (em expansão)

🧠 Lógica de Dados

Centralizada no useClientes.js:

Controla cadastro, edição, remoção, filtro

Dados em memória por enquanto (simulando banco de dados)

Estruturado para futura sincronização com IndexedDB e Firebase
