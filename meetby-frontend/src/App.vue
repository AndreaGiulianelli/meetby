<script setup>
import { RouterView } from 'vue-router';
import AppBar from './components/layout/AppBar.vue'
import AppFooter from './components/layout/AppFooter.vue'
</script>

<template>
  <v-app>
    <AppBar />
    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>