// src/composables/useClientes.js
import { ref } from 'vue'

// Simula a base de dados em memória
const clientes = ref([
  {
    id: 1,
    nome: 'Maria da Silva',
    telefone: '(11) 98765-4321',
    email: 'maria@example.com',
    instagram: '@maria',
    endereco: 'Rua A, 123',
    observacoes: 'Cliente antiga',
  },
  {
    id: 2,
    nome: 'João Oliveira',
    telefone: '(21) 99988-7766',
    email: 'joao@example.com',
    instagram: '@joao',
    endereco: 'Av. B, 456',
    observacoes: 'Prefere WhatsApp',
  },
])

let proximoId = 3

export function useClientes() {
  function listar() {
    return clientes.value
  }

  function buscarPorId(id) {
    return clientes.value.find((c) => c.id === Number(id))
  }

  function adicionar(cliente) {
    cliente.id = proximoId++
    clientes.value.push({ ...cliente })
  }

  function atualizar(clienteAtualizado) {
    const index = clientes.value.findIndex((c) => c.id === clienteAtualizado.id)
    if (index !== -1) {
      clientes.value[index] = { ...clienteAtualizado }
    }
  }

  function remover(id) {
    clientes.value = clientes.value.filter((c) => c.id !== Number(id))
  }

  return {
    listar,
    buscarPorId,
    adicionar,
    atualizar,
    remover,
  }
}
