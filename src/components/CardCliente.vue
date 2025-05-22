// src/components/CardCliente.vue
<template>
  <!-- Card do cliente -->
  <q-card flat bordered class="q-pa-md q-mb-sm shadow-1">
    <q-card-section class="row items-center justify-between">
      <!-- Nome do cliente em destaque -->
      <div class="text-h6 text-bold">{{ cliente.nome }}</div>
      <!-- Botão de 3 pontinhos com menu -->
      <q-btn flat dense round icon="more_vert">
        <q-menu cover auto-close>
          <q-list style="min-width: 150px">
            <q-item clickable v-close-popup @click="editarCliente">
              <q-item-section avatar><q-icon name="edit" /></q-item-section>
              <q-item-section>Editar</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="verDetalhes">
              <q-item-section avatar><q-icon name="info" /></q-item-section>
              <q-item-section>Ver detalhes</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="removerCliente">
              <q-item-section avatar><q-icon name="delete" color="negative" /></q-item-section>
              <q-item-section class="text-negative">Remover</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-card-section>

    <!-- Informações principais -->
    <q-card-section>
      <div class="q-mb-xs"><q-icon name="phone" class="q-mr-xs" /> {{ cliente.telefone }}</div>
      <div class="q-mb-xs">
        <q-icon name="shopping_cart" class="q-mr-xs" /> Última compra: {{ cliente.ultimaVenda }}
      </div>
      <div v-if="cliente.saldo > 0" class="text-negative text-subtitle2">
        <q-icon name="warning" class="q-mr-xs" /> Saldo em aberto: R$ {{ cliente.saldo.toFixed(2) }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useClientes } from 'composables/useClientes'

const props = defineProps({
  cliente: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const { remover } = useClientes()

function editarCliente() {
  router.push(`/clientes/editar/${props.cliente.id}`)
}

function verDetalhes() {
  router.push(`/clientes/detalhes/${props.cliente.id}`)
}

function removerCliente() {
  const confirmar = window.confirm(`Deseja realmente remover ${props.cliente.nome}?`)
  if (confirmar) {
    remover(props.cliente.id)
  }
}
</script>

<style scoped>
.q-card {
  background-color: #fdfcf9;
}
</style>
