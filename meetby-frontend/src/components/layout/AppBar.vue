<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const drawer = ref(false)
const store = useAuthStore()
const router = useRouter()
const { mobile } = useDisplay()

const items = [
    {
        title: 'My meets',
        value: 'meets',
        icon: 'mdi-view-dashboard',
        to: '/meets',
    }
]

function switchDrawer() {
    drawer.value = !drawer.value
}

function logout() {
    store.logout()
    router.push({ name: "home" })
}

</script>

<template>
    <v-app-bar :elevation="0">
        <v-app-bar-nav-icon icon="mdi-menu" aria-label="Menu" size="x-large" @click.stop="switchDrawer"/>
            <v-app-bar-title class="app-bar font-weight-black" @click.stop="router.push('/')">
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
                :to="item.to"
                @click.prevent="switchDrawer">
                <v-list-item-title class="drawerItem">{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
        
        <template v-slot:append>
            <div class="pa-2 mb-4">
                <v-btn block class="black-btn" @click.prevent="logout" v-if="store.isLoggedIn">
                    Logout
                </v-btn>
                <template v-else>
                    <v-btn block @click="switchDrawer" class="black-btn mb-1" aria-label="Login" to="/login">
                        Login
                    </v-btn>
                    <v-btn block @click="switchDrawer" class="black-btn" aria-label="Sign Up" to="/signup">
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