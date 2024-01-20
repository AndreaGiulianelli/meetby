<script setup>
import { RouterView } from 'vue-router';
import SimpleFooter from './components/SimpleFooter.vue'
</script>

<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
    <SimpleFooter />
  </v-app>
</template>