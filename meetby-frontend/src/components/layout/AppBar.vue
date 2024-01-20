<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useAuthStore } from '@/stores/auth.js'

const drawer = ref(false)
const store = useAuthStore()
const { mobile } = useDisplay()

const items = [
    {
        title: 'My meets',
        value: 'meets',
        icon: 'mdi-view-dashboard'
    }
]

function switchDrawer() {
    drawer.value = !drawer.value
}
</script>

<template>
    <v-app-bar :elevation="0">
        <v-app-bar-nav-icon icon="mdi-menu" aria-label="Menu" size="x-large" @click.stop="switchDrawer"/>
        <v-app-bar-title class="app-bar font-weight-black">
            meetby
        </v-app-bar-title>
        <v-spacer />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" floating :class="{ 'w-100': mobile }">
        <v-list density="compact" nav v-if="store.isLoggedIn">
            <v-list-item 
                v-for="item in items"
                :prepend-icon="item.icon"
                :value="item.value"
                :key="item.value"
                @click.prevent="switchDrawer">
                <v-list-item-title class="drawerItem">{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
        
        <template v-slot:append>
            <div class="pa-2 mb-4">
                <v-btn block class="black-btn" @click.prevent="store.logout" v-if="store.isLoggedIn">
                    Logout
                </v-btn>
                <template v-else>
                    <v-btn block class="black-btn mb-1" aria-label="Logout">
                        Login
                    </v-btn>
                    <v-btn block class="black-btn" aria-label="Sign Up">
                        Sign Up
                    </v-btn>
                </template>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<style scoped>
.app-bar {
    font-size: 1.4em;
}

.drawerItem {
    font-weight: 600;
}
</style>