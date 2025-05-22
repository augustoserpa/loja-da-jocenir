<!-- src/components/FormularioCliente.vue -->
<template>
  <q-form ref="formRef" @submit.prevent="salvarCliente">
    <!-- Campo: Nome -->
    <q-input v-model="form.nome" label="Nome" filled required class="q-mb-md" />

    <!-- Campo: Telefone -->
    <q-input
      v-model="form.telefone"
      label="Telefone"
      filled
      mask="(##) #####-####"
      class="q-mb-md"
    />

    <!-- Campo: E-mail -->
    <q-input v-model="form.email" label="E-mail" filled type="email" class="q-mb-md" />

    <!-- Campo: Instagram -->
    <q-input v-model="form.instagram" label="Instagram (@usuario)" filled class="q-mb-md" />

    <!-- Campo: Endereço -->
    <q-input v-model="form.endereco" label="Endereço" filled type="textarea" class="q-mb-md" />

    <!-- Campo: Observações -->
    <q-input
      v-model="form.observacoes"
      label="Observações"
      filled
      type="textarea"
      class="q-mb-md"
    />
  </q-form>
</template>

<script setup>
import { reactive, ref } from 'vue'

// Referência interna do formulário
const formRef = ref(null)

// Expõe o método submit para o componente pai
defineExpose({
  submit() {
    formRef.value?.validate().then((valid) => {
      if (valid) salvarCliente()
    })
  },
})

// Props com dados iniciais do cliente
const props = defineProps({
  cliente: {
    type: Object,
    default: () => ({
      nome: '',
      telefone: '',
      email: '',
      instagram: '',
      endereco: '',
      observacoes: '',
    }),
  },
})

const emit = defineEmits(['salvar'])
const form = reactive({ ...props.cliente })

function salvarCliente() {
  emit('salvar', { ...form, id: props.cliente.id })
}
</script>

<style scoped></style>
