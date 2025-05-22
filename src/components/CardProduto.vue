<template>
  <q-card class="q-mb-md">
    <q-card-section>
      <div class="row items-center justify-between">
        <!-- Informacoes do produto -->
        <div>
          <div class="text-h6">{{ produto.nome }}</div>
          <div class="text-subtitle2">Preço: R$ {{ produto.precoVenda.toFixed(2) }}</div>
          <div class="text-subtitle2">Estoque: {{ produto.estoqueAtual }}</div>
          <div class="text-caption text-grey">{{ produto.unidade }}</div>
        </div>

        <!-- Imagem e menu -->
        <div class="column items-end">
          <q-avatar square size="70px" class="q-mb-sm">
            <img :src="produto.imagemMiniatura || placeholderImagem" alt="Imagem" />
          </q-avatar>
          <q-btn flat round icon="more_vert" @click="abrirMenu">
            <q-menu v-model="menuAberto">
              <q-list>
                <q-item clickable v-close-popup @click="$emit('editar', produto.id)">
                  <q-item-section>Editar</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="$emit('ver-detalhes', produto.id)">
                  <q-item-section>Ver detalhes</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="$emit('remover', produto.id)">
                  <q-item-section>Remover</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  produto: {
    type: Object,
    required: true,
  },
})

const menuAberto = ref(false)
const placeholderImagem = 'https://via.placeholder.com/70x70?text=Produto'

function abrirMenu() {
  menuAberto.value = true
}
</script>

<style scoped>
.text-h6 {
  font-weight: bold;
}
</style>
