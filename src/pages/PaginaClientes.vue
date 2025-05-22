// src/pages/PaginaClientes.vue
<template>
  <q-page class="q-pa-md">
    <!-- Título da página -->
    <div class="text-h5 text-bold q-mb-md amatic-font">Clientes</div>

    <!-- Linha com campo de filtro + botão adicionar -->
    <div class="row items-center q-gutter-sm q-mb-md">
      <q-input
        v-model="filtro"
        filled
        debounce="300"
        placeholder="Buscar cliente..."
        class="col-grow"
        dense
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-btn round dense icon="add" color="primary" @click="adicionarCliente" />
    </div>

    <!-- Lista de cards -->
    <div>
      <CardCliente v-for="cliente in clientesFiltrados" :key="cliente.id" :cliente="cliente" />

      <div v-if="clientesFiltrados.length === 0" class="text-center text-grey">
        Nenhum cliente encontrado.
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import CardCliente from 'components/CardCliente.vue'
import { useClientes } from 'composables/useClientes'

const router = useRouter()
const { listar } = useClientes()

const filtro = ref('')

const clientesFiltrados = computed(() => {
  const termo = filtro.value.toLowerCase()
  return listar().filter((c) => c.nome.toLowerCase().includes(termo))
})

function adicionarCliente() {
  router.push('/clientes/novo')
}
</script>

<style scoped>
.amatic-font {
  font-family: 'Amatic SC', cursive;
}
</style>
