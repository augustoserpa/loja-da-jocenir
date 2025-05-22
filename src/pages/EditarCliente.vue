// src/pages/EditarCliente.vue
<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-bold amatic-font">Editar Cliente</div>
      <div class="q-gutter-sm">
        <q-btn flat label="Cancelar" color="negative" @click="voltar" />
        <q-btn label="Salvar" color="primary" @click="salvarManual" />
      </div>
    </div>

    <FormularioCliente
      v-if="cliente"
      ref="formulario"
      :cliente="cliente"
      @salvar="salvar"
      @cancelar="voltar"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormularioCliente from 'components/FormularioCliente.vue'
import { useClientes } from 'composables/useClientes'

const router = useRouter()
const route = useRoute()
const formulario = ref(null)
const { buscarPorId, atualizar } = useClientes()

const id = parseInt(route.params.id)
const cliente = ref(buscarPorId(id))

function salvar(dados) {
  atualizar(dados)
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
