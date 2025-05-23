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

            <!-- Menu de ações -->
            <q-btn flat round icon="more_vert">
              <q-menu auto-close>
                <q-list>
                  <q-item clickable @click="$emit('ver-detalhes', produto.id)">
                    <q-item-section avatar><q-icon name="visibility" /></q-item-section>
                    <q-item-section>Ver</q-item-section>
                  </q-item>
                  <q-item clickable @click="$emit('editar', produto.id)">
                    <q-item-section avatar><q-icon name="edit" /></q-item-section>
                    <q-item-section>Editar</q-item-section>
                  </q-item>
                  <q-item clickable @click="irParaAjusteEstoque">
                    <q-item-section avatar><q-icon name="inventory" /></q-item-section>
                    <q-item-section>Ajustar Estoque</q-item-section>
                  </q-item>
                  <q-item clickable @click="$emit('remover', produto.id)">
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
  </q-card>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  produto: {
    type: Object,
    required: true,
  },
})

const placeholderImagem = 'https://via.placeholder.com/70x70?text=Produto'

function irParaAjusteEstoque() {
  router.push(`/produtos/ajuste/${props.produto.id}`)
}
</script>

<style scoped>
.text-h6 {
  font-weight: bold;
}
.amatic-font {
  font-family: 'Amatic SC', cursive;
}
</style>
