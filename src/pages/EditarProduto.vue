<template>
  <q-page padding>
    <h5>Editar Produto</h5>
    <FormularioProduto v-if="produto" :produtoExistente="produto" />
    <div v-else>Carregando produto...</div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import FormularioProduto from 'src/components/FormularioProduto.vue'

// Simulação de função para buscar produto (depois será substituído por lógica real)
function buscarProdutoPorId() {
  // Aqui você consultaria IndexedDB, Firebase ou um array local
  return {
    id: '7891234567890',
    nome: 'Shampoo Hidratante',
    categoria: 'Cabelos',
    marca: 'Marca X',
    unidade: 'Frasco 400ml',
    precoVenda: 39.9,
    validade: '2026-06-01',
    composicao: 'Extrato de camomila, óleo de argan',
    publicoAlvo: 'Adultos com cabelos ressecados',
    observacoes: 'Clientes elogiam o aroma.',
    imagemMiniatura: '',
    imagemDetalhadaUrl: '',
  }
}

const route = useRoute()
const produto = ref(null)

onMounted(() => {
  const id = route.params.id
  produto.value = buscarProdutoPorId(id)
})
</script>
