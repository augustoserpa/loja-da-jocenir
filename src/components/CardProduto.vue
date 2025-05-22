<template>
  <q-card class="q-mb-md">
    <q-card-section>
      <div class="row items-start q-col-gutter-md">
        <!-- Imagem do produto -->
        <div>
          <q-avatar square size="70px">
            <img :src="produto.imagemMiniatura || placeholderImagem" alt="Imagem do Produto" />
          </q-avatar>
        </div>

        <!-- Informações do produto -->
        <div class="col">
          <div class="row items-center justify-between">
            <div>
              <div class="text-h6">{{ produto.nome }}</div>
              <div class="text-subtitle2">Preço: R$ {{ produto.precoVenda.toFixed(2) }}</div>
              <div class="text-subtitle2">Estoque: {{ produto.estoqueAtual }}</div>
              <div class="text-caption text-grey">{{ produto.unidade }}</div>
            </div>

            <!-- Botão de menu de ações -->
            <q-btn flat round icon="more_vert" @click="menuAberto = true">
              <q-menu v-model="menuAberto">
                <q-list>
                  <!-- Ver detalhes -->
                  <q-item clickable v-close-popup @click="$emit('ver-detalhes', produto.id)">
                    <q-item-section avatar><q-icon name="visibility" /></q-item-section>
                    <q-item-section>Ver</q-item-section>
                  </q-item>

                  <!-- Editar -->
                  <q-item clickable v-close-popup @click="$emit('editar', produto.id)">
                    <q-item-section avatar><q-icon name="edit" /></q-item-section>
                    <q-item-section>Editar</q-item-section>
                  </q-item>

                  <!-- Ajustar estoque -->
                  <q-item clickable v-close-popup @click="abrirDialogoAjuste">
                    <q-item-section avatar><q-icon name="inventory" /></q-item-section>
                    <q-item-section>Ajustar Estoque</q-item-section>
                  </q-item>

                  <!-- Remover -->
                  <q-item clickable v-close-popup @click="$emit('remover', produto.id)">
                    <q-item-section avatar><q-icon name="delete" /></q-item-section>
                    <q-item-section>Remover</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </div>
    </q-card-section>

    <!-- Diálogo de ajuste de estoque -->
    <q-dialog v-model="mostrarDialogo">
      <q-card style="min-width: 300px">
        <q-card-section>
          <div class="text-h6">Ajustar Estoque</div>
          <div class="text-caption text-negative q-mt-xs">
            O valor digitado será somado (positivo) ou subtraído (negativo) do estoque atual.
          </div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model.number="ajuste"
            type="number"
            label="Quantidade a ajustar"
            filled
            dense
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Confirmar" color="primary" @click="confirmarAjuste" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  produto: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['ver-detalhes', 'editar', 'remover', 'ajustar-estoque'])

const menuAberto = ref(false)
const mostrarDialogo = ref(false)
const ajuste = ref(0)

const placeholderImagem = 'https://via.placeholder.com/70x70?text=Produto'

function abrirDialogoAjuste() {
  mostrarDialogo.value = true
}

function confirmarAjuste() {
  if (ajuste.value !== 0) {
    emit('ajustar-estoque', { id: props.produto.id, quantidade: ajuste.value })
    ajuste.value = 0
  }
  mostrarDialogo.value = false
}
</script>

<style scoped>
.text-h6 {
  font-weight: bold;
}
</style>
