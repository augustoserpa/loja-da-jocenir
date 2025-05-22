// src/pages/DetalhesCliente.vue
<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-lg">
      <q-card-section class="row items-center justify-between q-mb-md">
        <div class="text-h5 text-bold amatic-font">Detalhes do Cliente</div>
        <q-btn flat dense icon="arrow_back" label="Voltar" @click="voltar" />
      </q-card-section>

      <q-separator class="q-my-sm" />

      <q-card-section>
        <div class="q-mb-md">
          <q-icon name="person" class="q-mr-sm" /> <strong>Nome:</strong> {{ cliente?.nome }}
        </div>
        <div class="q-mb-md">
          <q-icon name="phone" class="q-mr-sm" /> <strong>Telefone:</strong> {{ cliente?.telefone }}
        </div>
        <div class="q-mb-md">
          <q-icon name="email" class="q-mr-sm" /> <strong>E-mail:</strong> {{ cliente?.email }}
        </div>
        <div class="q-mb-md">
          <q-icon name="alternate_email" class="q-mr-sm" /> <strong>Instagram:</strong>
          {{ cliente?.instagram }}
        </div>
        <div class="q-mb-md">
          <q-icon name="home" class="q-mr-sm" /> <strong>Endereço:</strong> {{ cliente?.endereco }}
        </div>
        <div class="q-mb-md">
          <q-icon name="note" class="q-mr-sm" /> <strong>Observações:</strong>
          {{ cliente?.observacoes }}
        </div>
        <div class="q-mb-md">
          <q-icon name="shopping_cart" class="q-mr-sm" /> <strong>Última venda:</strong>
          {{ cliente?.ultimaVenda || 'N/A' }}
        </div>
        <div class="q-mb-md" v-if="cliente?.saldo > 0">
          <q-icon name="warning" class="q-mr-sm text-negative" />
          <strong class="text-negative">Saldo em aberto:</strong> R$ {{ cliente.saldo.toFixed(2) }}
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useClientes } from 'composables/useClientes'

const router = useRouter()
const route = useRoute()
const { buscarPorId } = useClientes()

const id = parseInt(route.params.id)
const cliente = buscarPorId(id)

function voltar() {
  router.push('/clientes')
}
</script>

<style scoped>
.amatic-font {
  font-family: 'Amatic SC', cursive;
}
</style>
