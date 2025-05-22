<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Produtos</div>
      <q-btn color="primary" icon="add" label="Novo" @click="irParaNovoProduto" />
    </div>

    <q-input filled v-model="filtro" label="Filtrar por nome" class="q-mb-md" debounce="300">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <div v-if="produtosFiltrados.length">
      <q-card v-for="produto in produtosFiltrados" :key="produto.id" class="q-mb-md">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>
              <div class="text-h6">{{ produto.nome }}</div>
              <div class="text-subtitle2">Preço: R$ {{ produto.precoVenda.toFixed(2) }}</div>
              <div class="text-subtitle2">Estoque: {{ produto.estoqueAtual }}</div>
              <div class="text-caption text-grey">{{ produto.unidade }}</div>
            </div>

            <div class="column items-end">
              <q-avatar square size="70px" class="q-mb-sm">
                <img :src="produto.imagemMiniatura || placeholderImagem" alt="Imagem" />
              </q-avatar>
              <q-btn flat round icon="more_vert" @click="abrirMenu(produto.id)">
                <q-menu v-model="menusAbertos[produto.id]">
                  <q-list>
                    <q-item clickable v-close-popup @click="editarProduto(produto.id)">
                      <q-item-section>Editar</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="verDetalhes(produto.id)">
                      <q-item-section>Ver detalhes</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="removerProduto(produto.id)">
                      <q-item-section>Remover</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div v-else class="text-grey">Nenhum produto encontrado.</div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProdutos } from 'src/composables/useProdutos'

const { produtos, removerProduto } = useProdutos()
const filtro = ref('')
const menusAbertos = ref({})
const router = useRouter()

const produtosFiltrados = computed(() => {
  if (!filtro.value) return produtos.value
  const termo = filtro.value.toLowerCase()
  return produtos.value.filter((p) => p.nome.toLowerCase().includes(termo) || p.id.includes(termo))
})

const placeholderImagem = 'https://via.placeholder.com/70x70?text=Produto'

function irParaNovoProduto() {
  router.push('/produtos/novo')
}

function abrirMenu(id) {
  menusAbertos.value[id] = true
}

function editarProduto(id) {
  router.push(`/produtos/editar/${id}`)
}

function verDetalhes(id) {
  router.push(`/produtos/detalhes/${id}`)
}
</script>
