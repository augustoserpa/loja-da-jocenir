import { ref } from 'vue'

const produtos = ref([
  {
    id: '7890001112223',
    nome: 'Sabonete Líquido Lavanda',
    categoria: 'Higiene',
    marca: 'Floratta',
    unidade: 'Frasco 250ml',
    precoVenda: 15.9,
    estoqueAtual: 12,
    validade: '2025-12-31',
    composicao: 'Extrato de lavanda, glicerina vegetal',
    publicoAlvo: 'Adultos e adolescentes',
    observacoes: 'Muito procurado no inverno.',
    precoCustoHistorico: [{ data: '2025-02-01', preco: 9.5, quantidade: 12 }],
    imagemMiniatura: '',
    imagemDetalhadaUrl: '',
  },
  {
    id: '7890003334445',
    nome: 'Perfume Floral Leve',
    categoria: 'Perfumes',
    marca: 'Essência Pura',
    unidade: 'Vidro 50ml',
    precoVenda: 49.9,
    estoqueAtual: 8,
    validade: '2026-08-20',
    composicao: 'Álcool de cereais, fragrância floral',
    publicoAlvo: 'Feminino',
    observacoes: 'Fragrância suave e de longa duração.',
    precoCustoHistorico: [{ data: '2025-01-20', preco: 32.0, quantidade: 8 }],
    imagemMiniatura: '',
    imagemDetalhadaUrl: '',
  },
  {
    id: '7890005556667',
    nome: 'Creme Hidratante Corporal',
    categoria: 'Cuidados com a Pele',
    marca: 'Beleza Natural',
    unidade: 'Pote 200g',
    precoVenda: 27.5,
    estoqueAtual: 20,
    validade: '2026-03-15',
    composicao: 'Manteiga de karité, vitamina E',
    publicoAlvo: 'Unissex',
    observacoes: 'Ideal para peles secas.',
    precoCustoHistorico: [{ data: '2025-03-05', preco: 17.0, quantidade: 20 }],
    imagemMiniatura: '',
    imagemDetalhadaUrl: '',
  },
])

export function useProdutos() {
  function listarProdutos() {
    return produtos.value
  }

  function adicionarProduto(produto, estoqueInicial = 0) {
    produto.estoqueAtual = estoqueInicial
    produtos.value.push(produto)
  }

  function atualizarProduto(id, dadosAtualizados) {
    const index = produtos.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      produtos.value[index] = { ...produtos.value[index], ...dadosAtualizados }
    }
  }

  function removerProduto(id) {
    produtos.value = produtos.value.filter((p) => p.id !== id)
  }

  function buscarProdutoPorId(id) {
    return produtos.value.find((p) => p.id === id) || null
  }

  return {
    produtos,
    listarProdutos,
    adicionarProduto,
    atualizarProduto,
    removerProduto,
    buscarProdutoPorId,
  }
}
