<template>
  <q-page class="q-pa-md">
    <!-- Cabeçalho com título e botões -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-bold amatic-font">Editar Produto</div>
      <div class="q-gutter-sm">
        <q-btn flat label="Cancelar" color="negative" @click="voltar" />
        <q-btn label="Salvar" color="primary" @click="salvarManual" />
      </div>
    </div>

    <!-- Formulário com dados carregados -->
    <FormularioProduto
      v-if="produto"
      ref="formulario"
      :produto-existente="produto"
      :modo-edicao="true"
      @salvar="salvar"
      @cancelar="voltar"
    />
    <div v-else>Carregando produto...</div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormularioProduto from 'src/components/FormularioProduto.vue'
import { useProdutos } from 'src/composables/useProdutos'

const formulario = ref(null)
const produto = ref(null)
const route = useRoute()
const router = useRouter()
const { buscarProdutoPorId, atualizarProduto } = useProdutos()

onMounted(() => {
  produto.value = buscarProdutoPorId(route.params.id)
})

function salvar(dados) {
  atualizarProduto(dados.produto.id, dados.produto)
  voltar()
}

function salvarManual() {
  formulario.value?.salvar()
}

function voltar() {
  router.push('/produtos')
}
</script>

<style scoped>
.amatic-font {
  font-family: 'Amatic SC', cursive;
}
</style>
