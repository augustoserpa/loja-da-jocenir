<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-lg">
      <!-- Cabeçalho com título e botão de voltar -->
      <q-card-section class="row items-center justify-between q-mb-md">
        <div class="text-h5 text-bold amatic-font">Detalhes do Produto</div>
        <q-btn flat dense icon="arrow_back" label="Voltar" @click="voltar" />
      </q-card-section>

      <q-separator class="q-my-sm" />

      <!-- Nome e imagem -->
      <q-card-section class="row items-center q-mb-md">
        <div class="col">
          <div class="text-h6">{{ produto.nome }}</div>
          <div class="text-subtitle2 text-grey">Código: {{ produto.id }}</div>
        </div>
        <q-avatar square size="100px">
          <img :src="produto.imagemMiniatura || placeholderImagem" alt="Imagem do Produto" />
        </q-avatar>
      </q-card-section>

      <!-- Informações principais -->
      <q-card-section class="q-gutter-md">
        <div>
          <q-icon name="category" class="q-mr-sm" /> <strong>Categoria:</strong>
          {{ produto.categoria }}
        </div>
        <div>
          <q-icon name="branding_watermark" class="q-mr-sm" /> <strong>Marca:</strong>
          {{ produto.marca }}
        </div>
        <div>
          <q-icon name="precision_manufacturing" class="q-mr-sm" /> <strong>Unidade:</strong>
          {{ produto.unidade }}
        </div>
        <div>
          <q-icon name="attach_money" class="q-mr-sm" /> <strong>Preço de Revenda:</strong> R$
          {{ produto.precoVenda.toFixed(2) }}
        </div>
        <div>
          <q-icon name="inventory" class="q-mr-sm" /> <strong>Estoque Atual:</strong>
          {{ produto.estoqueAtual }}
        </div>
        <div v-if="produto.validade">
          <q-icon name="event" class="q-mr-sm" /> <strong>Validade:</strong> {{ produto.validade }}
        </div>
        <div v-if="produto.publicoAlvo">
          <q-icon name="groups" class="q-mr-sm" /> <strong>Público-alvo:</strong>
          {{ produto.publicoAlvo }}
        </div>
      </q-card-section>

      <!-- Composição e observações -->
      <q-card-section v-if="produto.composicao">
        <q-icon name="science" class="q-mr-sm" /> <strong>Composição:</strong>
        <p>{{ produto.composicao }}</p>
      </q-card-section>

      <q-card-section v-if="produto.observacoes">
        <q-icon name="note" class="q-mr-sm" /> <strong>Observações:</strong>
        <p>{{ produto.observacoes }}</p>
      </q-card-section>

      <!-- Histórico de custo -->
      <q-card-section v-if="produto.precoCustoHistorico?.length">
        <q-icon name="history" class="q-mr-sm" /> <strong>Histórico de Preços de Aquisição:</strong>
        <q-list bordered>
          <q-item v-for="(item, index) in produto.precoCustoHistorico" :key="index">
            <q-item-section>
              {{ item.data }} - R$ {{ item.preco.toFixed(2) }} ({{ item.quantidade }} unidades)
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProdutos } from 'src/composables/useProdutos'

const route = useRoute()
const router = useRouter()
const { buscarProdutoPorId } = useProdutos()

const produto = ref(null)
const placeholderImagem = 'https://via.placeholder.com/100x100?text=Produto'

onMounted(() => {
  produto.value = buscarProdutoPorId(route.params.id)
})

function voltar() {
  router.push('/produtos')
}
</script>

<style scoped>
.amatic-font {
  font-family: 'Amatic SC', cursive;
}
</style>
