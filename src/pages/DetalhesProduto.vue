<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-lg">
      <!-- Cabeçalho com título e botão de voltar -->
      <q-card-section class="row items-center justify-between q-mb-md">
        <div class="text-h5 text-bold amatic-font">Detalhes do Produto</div>
        <q-btn flat dense icon="arrow_back" label="Voltar" @click="voltar" />
      </q-card-section>

      <q-separator class="q-my-sm" />

      <q-card-section v-if="produto">
        <div class="q-mb-md">
          <q-icon name="info" class="q-mr-sm" /><strong>Nome:</strong> {{ produto.nome }}
        </div>
        <div class="q-mb-md">
          <q-icon name="confirmation_number" class="q-mr-sm" /><strong>Código:</strong>
          {{ produto.id }}
        </div>
        <div class="q-mb-md">
          <q-icon name="category" class="q-mr-sm" /><strong>Categoria:</strong>
          {{ produto.categoria }}
        </div>
        <div class="q-mb-md">
          <q-icon name="branding_watermark" class="q-mr-sm" /><strong>Marca:</strong>
          {{ produto.marca }}
        </div>
        <div class="q-mb-md">
          <q-icon name="precision_manufacturing" class="q-mr-sm" /><strong>Unidade:</strong>
          {{ produto.unidade }}
        </div>
        <div class="q-mb-md">
          <q-icon name="attach_money" class="q-mr-sm" /><strong>Preço de Revenda:</strong> R$
          {{ produto.precoVenda.toFixed(2) }}
        </div>
        <div class="q-mb-md">
          <q-icon name="inventory" class="q-mr-sm" /><strong>Estoque Atual:</strong>
          {{ produto.estoqueAtual }}
        </div>
        <div class="q-mb-md" v-if="produto.validade">
          <q-icon name="event" class="q-mr-sm" /><strong>Validade:</strong> {{ produto.validade }}
        </div>
        <div class="q-mb-md" v-if="produto.publicoAlvo">
          <q-icon name="groups" class="q-mr-sm" /><strong>Público-alvo:</strong>
          {{ produto.publicoAlvo }}
        </div>
        <div class="q-mb-md" v-if="produto.composicao">
          <q-icon name="science" class="q-mr-sm" /><strong>Composição:</strong>
          {{ produto.composicao }}
        </div>
        <div class="q-mb-md" v-if="produto.observacoes">
          <q-icon name="note" class="q-mr-sm" /><strong>Observações:</strong>
          {{ produto.observacoes }}
        </div>

        <!-- Histórico de Preços de Aquisição -->
        <div class="q-mb-md" v-if="produto.precoCustoHistorico?.length">
          <q-icon name="history" class="q-mr-sm" />
          <strong>Histórico de Preços de Aquisição:</strong>
          <q-list bordered class="q-mt-sm">
            <q-item v-for="(item, index) in produto.precoCustoHistorico" :key="index">
              <q-item-section>
                {{ item.data }} - R$ {{ item.preco.toFixed(2) }} ({{ item.quantidade }} unidades)
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- Histórico de Ajustes de Estoque -->
        <div class="q-mb-md" v-if="produto.ajustesEstoqueHistorico?.length">
          <q-icon name="edit_note" class="q-mr-sm" />
          <strong>Histórico de Ajustes de Estoque:</strong>
          <q-list bordered class="q-mt-sm">
            <q-item v-for="(ajuste, index) in produto.ajustesEstoqueHistorico" :key="index">
              <q-item-section>
                {{ ajuste.data }} — Ajuste:
                <span :class="ajuste.quantidade > 0 ? 'text-positive' : 'text-negative'">
                  {{ ajuste.quantidade > 0 ? '+' : '' }}{{ ajuste.quantidade }}
                </span>
                <div v-if="ajuste.motivo" class="text-caption text-grey">
                  Motivo: {{ ajuste.motivo }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- Imagem destacada -->
        <div class="q-mb-md" v-if="produto.imagemMiniatura">
          <div class="text-subtitle1 q-mb-sm">
            <q-icon name="image" class="q-mr-sm" />
            <strong>Imagem do Produto</strong>
          </div>
          <q-img
            :src="produto.imagemMiniatura || placeholderImagem"
            style="max-width: 300px; border-radius: 8px"
            spinner-color="primary"
            class="shadow-2"
          />
        </div>
      </q-card-section>

      <q-card-section v-else>
        <div class="text-grey">Carregando produto...</div>
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
.text-h6 {
  font-weight: bold;
}
</style>
