// src/pages/DetalhesProduto.vue

<template>
  <q-page padding>
    <h5 class="q-mb-md">Detalhes do Produto</h5>

    <q-card v-if="produto" class="q-pa-md">
      <!-- Nome e imagem -->
      <div class="row items-center q-mb-md">
        <div class="col">
          <div class="text-h6">{{ produto.nome }}</div>
          <div class="text-subtitle2 text-grey">ID: {{ produto.id }}</div>
        </div>
        <q-avatar square size="100px">
          <img :src="produto.imagemMiniatura || placeholderImagem" alt="Imagem do Produto" />
        </q-avatar>
      </div>

      <!-- Informações principais -->
      <q-list bordered class="q-mb-md">
        <q-item>
          <q-item-section><strong>Categoria:</strong> {{ produto.categoria }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section><strong>Marca:</strong> {{ produto.marca }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section><strong>Unidade:</strong> {{ produto.unidade }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <strong>Preço de Revenda:</strong> R$ {{ produto.precoVenda.toFixed(2) }}
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <strong>Estoque Atual:</strong> {{ produto.estoqueAtual }}
          </q-item-section>
        </q-item>
        <q-item v-if="produto.validade">
          <q-item-section><strong>Validade:</strong> {{ produto.validade }}</q-item-section>
        </q-item>
        <q-item v-if="produto.publicoAlvo">
          <q-item-section><strong>Público-alvo:</strong> {{ produto.publicoAlvo }}</q-item-section>
        </q-item>
      </q-list>

      <!-- Composição e observações -->
      <div v-if="produto.composicao" class="q-mb-md">
        <strong>Composição:</strong>
        <p>{{ produto.composicao }}</p>
      </div>

      <div v-if="produto.observacoes">
        <strong>Observações:</strong>
        <p>{{ produto.observacoes }}</p>
      </div>

      <!-- Histórico de preços de aquisição -->
      <div v-if="produto.precoCustoHistorico?.length" class="q-mt-md">
        <strong>Histórico de Preços de Aquisição:</strong>
        <q-list bordered>
          <q-item v-for="(item, index) in produto.precoCustoHistorico" :key="index">
            <q-item-section>
              {{ item.data }} - R$ {{ item.preco.toFixed(2) }} ({{ item.quantidade }} unidades)
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card>

    <div v-else>Carregando produto...</div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Simulação de busca — substituir pelo useProdutos no futuro
function buscarProdutoPorId() {
  return {
    id: '7891234567890',
    nome: 'Shampoo Hidratante',
    categoria: 'Cabelos',
    marca: 'Marca X',
    unidade: 'Frasco 400ml',
    precoVenda: 39.9,
    estoqueAtual: 20,
    validade: '2026-06-01',
    composicao: 'Extrato de camomila, óleo de argan',
    publicoAlvo: 'Adultos com cabelos ressecados',
    observacoes: 'Clientes elogiam o aroma.',
    precoCustoHistorico: [
      { data: '2025-01-10', preco: 25.0, quantidade: 10 },
      { data: '2025-03-15', preco: 27.0, quantidade: 15 },
    ],
    imagemMiniatura: '',
  }
}

const route = useRoute()
const produto = ref(null)
const placeholderImagem = 'https://via.placeholder.com/100x100?text=Produto'

onMounted(() => {
  produto.value = buscarProdutoPorId(route.params.id)
})
</script>
