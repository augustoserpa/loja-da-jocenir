<template>
  <q-form @submit.prevent="salvar">
    <!-- Nome do Produto -->
    <q-input filled v-model="produto.nome" label="Nome do Produto" class="q-mb-md" required />

    <!-- Código de Barras / ID -->
    <q-input
      filled
      v-model="produto.id"
      label="Código do Produto (Código de Barras ou ID)"
      class="q-mb-md"
      required
    />

    <!-- Categoria -->
    <q-input filled v-model="produto.categoria" label="Categoria" class="q-mb-md" />

    <!-- Marca -->
    <q-input filled v-model="produto.marca" label="Marca" class="q-mb-md" />

    <!-- Unidade -->
    <q-input
      filled
      v-model="produto.unidade"
      label="Unidade (ex: Frasco 400ml, Bisnaga 20g)"
      class="q-mb-md"
    />

    <!-- Preço de Venda (somente na criação) -->
    <q-input
      v-if="!modoEdicao"
      filled
      v-model.number="produto.precoVenda"
      type="number"
      label="Preço de Revenda"
      prefix="R$"
      class="q-mb-md"
      required
    />

    <!-- Estoque Inicial (somente na criação) -->
    <q-input
      v-if="!modoEdicao"
      filled
      v-model.number="estoqueInicial"
      type="number"
      label="Estoque Inicial"
      class="q-mb-md"
    />

    <!-- Validade (somente na criação) -->
    <q-input
      v-if="!modoEdicao"
      filled
      v-model="produto.validade"
      label="Data de Validade"
      mask="####-##-##"
      hint="Formato: AAAA-MM-DD"
      class="q-mb-md"
    />

    <!-- Composição -->
    <q-input
      filled
      v-model="produto.composicao"
      label="Composição"
      type="textarea"
      class="q-mb-md"
    />

    <!-- Público-alvo -->
    <q-input filled v-model="produto.publicoAlvo" label="Público-alvo" class="q-mb-md" />

    <!-- Observações -->
    <q-input
      filled
      v-model="produto.observacoes"
      label="Observações internas"
      type="textarea"
      class="q-mb-md"
    />
  </q-form>
</template>

<script setup>
import { ref, onMounted, defineExpose } from 'vue'

const props = defineProps({
  produtoExistente: Object,
  modoEdicao: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['salvar'])

const produto = ref({
  id: '',
  nome: '',
  categoria: '',
  marca: '',
  unidade: '',
  precoVenda: 0,
  validade: '',
  composicao: '',
  publicoAlvo: '',
  observacoes: '',
  imagemMiniatura: '',
  imagemDetalhadaUrl: '',
})

const estoqueInicial = ref(0)

onMounted(() => {
  if (props.produtoExistente) {
    Object.assign(produto.value, props.produtoExistente)
  }
})

function salvar() {
  emit('salvar', {
    produto: produto.value,
    estoqueInicial: estoqueInicial.value,
  })
}

defineExpose({ salvar })
</script>
