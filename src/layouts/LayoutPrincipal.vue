// src/layouts/LayoutPrincipal.vue
<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Cabeçalho fixo com nome e botão hamburguer -->
    <q-header elevated class="bg-verde-musgo text-creme">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="menuVisivel = !menuVisivel" aria-label="Menu" />
        <q-toolbar-title class="amatic-font text-h5">Loja da Jocenir</q-toolbar-title>
      </q-toolbar>

      <!-- Menu suspenso (dropdown) -->
      <div v-if="menuVisivel" class="bg-verde-oliva text-white q-pa-md shadow-2">
        <q-list>
          <q-item clickable v-ripple @click="irParaInicio">
            <q-item-section avatar><q-icon name="home" /></q-item-section>
            <q-item-section>Início</q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="logout">
            <q-item-section avatar><q-icon name="logout" color="negative" /></q-item-section>
            <q-item-section class="text-negative">Sair</q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-header>

    <!-- Conteúdo principal -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Rodapé fixo com navegação -->
    <q-footer elevated class="bg-bege-claro text-black">
      <q-tabs align="justify" dense class="text-black">
        <q-route-tab
          name="clientes"
          icon="people"
          label="Clientes"
          to="/clientes"
          :class="{ 'bg-verde-oliva': isActive('/clientes') }"
        />
        <q-route-tab
          name="produtos"
          icon="inventory"
          label="Produtos"
          to="/produtos"
          :class="{ 'bg-verde-oliva': isActive('/produtos') }"
        />
        <q-route-tab
          name="vendas"
          icon="point_of_sale"
          label="Vendas"
          to="/vendas"
          class="bg-marrom text-white q-mx-sm"
          :class="{ 'bg-verde-musgo': isActive('/vendas') }"
        />
        <q-route-tab
          name="relatorios"
          icon="bar_chart"
          label="Relatórios"
          to="/relatorios"
          :class="{ 'bg-verde-oliva': isActive('/relatorios') }"
        />
        <q-route-tab
          name="promover"
          icon="campaign"
          label="Promover"
          to="/promover"
          :class="{ 'bg-verde-oliva': isActive('/promover') }"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const menuVisivel = ref(false)
const router = useRouter()
const route = useRoute()

function logout() {
  router.push('/login')
}

function irParaInicio() {
  router.push('/')
  menuVisivel.value = false
}

function isActive(path) {
  return route.path === path
}
</script>

<style scoped>
.q-toolbar-title {
  font-weight: bold;
}
</style>

<style>
/* Aqui você pode usar classes globais, se quiser personalizar */
</style>
