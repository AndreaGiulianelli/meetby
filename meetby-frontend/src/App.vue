<script setup>
import { RouterView } from 'vue-router';
import AppBar from './components/layout/AppBar.vue'
import AppFooter from './components/layout/AppFooter.vue'
</script>

<template>
  <v-app>
    <AppBar />
    <v-main class="d-flex flex-column">
      <v-container fluid class="d-flex flex-column h-100">
        <RouterView />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>