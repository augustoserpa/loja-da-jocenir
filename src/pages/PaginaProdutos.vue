<template>
  <q-page class="q-pa-md">
    <!-- Título -->
    <div class="text-h5 text-bold q-mb-md amatic-font">Produtos</div>

    <!-- Filtro + botão adicionar -->
    <div class="row items-center q-gutter-sm q-mb-md">
      <q-input
        v-model="filtro"
        filled
        debounce="300"
        placeholder="Buscar produto por nome ou código..."
        class="col-grow"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-btn round dense icon="add" color="primary" @click="irParaNovoProduto" />
    </div>

    <!-- Lista de produtos -->
    <div v-if="produtosFiltrados.length">
      <CardProduto
        v-for="produto in produtosFiltrados"
        :key="produto.id"
        :produto="produto"
        @editar="editarProduto"
        @ver-detalhes="verDetalhes"
        @remover="removerProdutoLocal"
      />
    </div>

    <div v-else class="text-center text-grey">Nenhum produto encontrado.</div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import CardProduto from 'src/components/CardProduto.vue'
import { useProdutos } from 'src/composables/useProdutos'

const { produtos, removerProduto: removerProdutoOriginal } = useProdutos()
const filtro = ref('')
const router = useRouter()

const produtosFiltrados = computed(() => {
  if (!filtro.value) return produtos.value
  const termo = filtro.value.toLowerCase()
  return produtos.value.filter((p) => p.nome.toLowerCase().includes(termo) || p.id.includes(termo))
})

function irParaNovoProduto() {
  router.push('/produtos/novo')
}

function editarProduto(id) {
  router.push(`/produtos/editar/${id}`)
}

function verDetalhes(id) {
  router.push(`/produtos/detalhes/${id}`)
}

function removerProdutoLocal(id) {
  removerProdutoOriginal(id)
}
</script>

<style scoped>
.amatic-font {
  font-family: 'Amatic SC', cursive;
}
</style>
