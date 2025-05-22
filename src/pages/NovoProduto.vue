<template>
  <q-page class="q-pa-md">
    <!-- Cabeçalho com título e botões -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-bold amatic-font">Novo Produto</div>
      <div class="q-gutter-sm">
        <q-btn flat label="Cancelar" color="negative" @click="voltar" />
        <q-btn label="Salvar" color="primary" @click="salvarManual" />
      </div>
    </div>

    <!-- Formulário reutilizável -->
    <FormularioProduto ref="formulario" :modo-edicao="false" @salvar="salvar" @cancelar="voltar" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormularioProduto from 'src/components/FormularioProduto.vue'
import { useProdutos } from 'src/composables/useProdutos'

const router = useRouter()
const formulario = ref(null)
const { adicionarProduto } = useProdutos()

function salvar(dados) {
  adicionarProduto(dados.produto, dados.estoqueInicial)
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
