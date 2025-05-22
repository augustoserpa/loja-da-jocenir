// src/pages/NovoCliente.vue
<template>
  <q-page class="q-pa-md">
    <!-- Cabeçalho com título e botões -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-bold amatic-font">Novo Cliente</div>
      <div class="q-gutter-sm">
        <q-btn flat label="Cancelar" color="negative" @click="voltar" />
        <q-btn label="Salvar" color="primary" @click="salvarManual" />
      </div>
    </div>

    <!-- Formulário -->
    <FormularioCliente ref="formulario" @salvar="salvar" @cancelar="voltar" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormularioCliente from 'components/FormularioCliente.vue'
import { useClientes } from 'composables/useClientes'

const router = useRouter()
const formulario = ref(null)
const { adicionar } = useClientes()

function salvar(dados) {
  adicionar(dados)
  voltar()
}

function salvarManual() {
  formulario.value?.submit()
}

function voltar() {
  router.push('/clientes')
}
</script>

<style scoped>
.amatic-font {
  font-family: 'Amatic SC', cursive;
}
</style>
