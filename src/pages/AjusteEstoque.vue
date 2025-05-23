<template>
  <q-page class="q-pa-md">
    <!-- Cabeçalho -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-bold amatic-font">Ajustar Estoque</div>
      <div class="q-gutter-sm">
        <q-btn flat label="Cancelar" color="negative" @click="voltar" />
        <q-btn label="Salvar Ajuste" color="primary" @click="salvarAjuste" />
      </div>
    </div>

    <!-- Formulário -->
    <q-card flat bordered class="q-pa-md" v-if="produto">
      <div class="q-mb-md"><strong>Produto:</strong> {{ produto.nome }}</div>
      <div class="q-mb-md"><strong>Estoque atual:</strong> {{ produto.estoqueAtual }}</div>

      <q-input
        v-model.number="ajuste"
        type="number"
        label="Quantidade a ajustar"
        filled
        dense
        class="q-mb-md"
        :rules="[(val) => val !== '' && !isNaN(val)]"
      />

      <q-input
        v-model="validade"
        label="Data de validade (opcional)"
        filled
        dense
        class="q-mb-md"
        mask="####-##-##"
      />

      <q-input
        v-model.number="precoCustoAtual"
        label="Preço de Compra Atual (opcional)"
        prefix="R$"
        type="number"
        filled
        dense
        class="q-mb-md"
      />

      <q-input
        v-model.number="precoVenda"
        label="Preço de Revenda Atual (opcional)"
        prefix="R$"
        type="number"
        filled
        dense
        class="q-mb-md"
      />

      <q-input
        v-model="motivo"
        label="Motivo do ajuste (opcional)"
        type="textarea"
        filled
        dense
        class="q-mb-md"
      />
    </q-card>

    <div v-else class="text-center text-grey q-mt-md">Carregando produto...</div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProdutos } from 'src/composables/useProdutos'

const route = useRoute()
const router = useRouter()
const { buscarProdutoPorId, registrarAjusteEstoque } = useProdutos()

const produto = ref(null)
const ajuste = ref(0)
const motivo = ref('')
const validade = ref('')
const precoCustoAtual = ref(0)
const precoVenda = ref(0)

onMounted(() => {
  const encontrado = buscarProdutoPorId(route.params.id)
  if (encontrado) {
    produto.value = encontrado
    validade.value = encontrado.validade || ''
    precoCustoAtual.value = encontrado.precoCustoAtual || 0
    precoVenda.value = encontrado.precoVenda || 0
  }
})

function voltar() {
  router.push('/produtos')
}

function salvarAjuste() {
  if (!produto.value || ajuste.value === 0) return

  registrarAjusteEstoque(produto.value.id, {
    quantidade: ajuste.value,
    motivo: motivo.value,
    precoCompra: precoCustoAtual.value,
    precoRevenda: precoVenda.value,
    validade: validade.value,
  })

  router.push('/produtos')
}
</script>

<style scoped>
.amatic-font {
  font-family: 'Amatic SC', cursive;
}
</style>
