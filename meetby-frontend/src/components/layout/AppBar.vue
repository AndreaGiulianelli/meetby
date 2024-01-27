<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { useNotificationStore } from '@/stores/notification.js'

const drawer = ref(false)
const authStore = useAuthStore()
const notificationStore = useNotificationStore()
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
    authStore.logout()
    router.push({ name: "home" })
}

</script>

<template>
    <v-app-bar :elevation="0">
        <v-app-bar-nav-icon icon="mdi-menu" aria-label="Menu" size="x-large" @click.stop="switchDrawer"/>
            <v-app-bar-title class="app-bar font-weight-black" @click.stop="router.push('/')" :aria-label="authStore.isLoggedIn ? 'My meets' : 'Home'">
                meetby
            </v-app-bar-title>
        <v-spacer />
        
        <v-btn v-if="authStore.isLoggedIn" bg-color="paletteWhite" aria-label="Notifications" size="large" to="/notifications">
            <v-badge v-if="notificationStore.unreadNotificationCounter > 0" :content="notificationStore.unreadNotificationCounter">
                <v-icon size="large" icon="mdi-bell-outline"/>
            </v-badge>
            <v-icon v-else size="large" icon="mdi-bell-outline"/>
        </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" floating :class="{ 'w-100': mobile }">
        <v-list-item :subtitle="`@${authStore.username}`" class="py-3" >
            <template v-slot:title>
                <span class="font-weight-bold">{{ authStore.name }} {{ authStore.surname }}</span>
            </template>
            <template v-slot:prepend>
                <v-avatar color="paletteBlue" icon="mdi-account-circle"></v-avatar>
            </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav v-if="authStore.isLoggedIn">
            <v-list-item 
                v-for="item in items"
                :prepend-icon="item.icon"
                :value="item.value"
                :key="item.value"
                :to="item.to"
                @click="switchDrawer">
                <v-list-item-title class="drawerItem">{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
        
        <template v-slot:append>
            <div class="pa-2 mb-4">
                <v-btn block class="black-btn" @click.prevent="logout" v-if="authStore.isLoggedIn">
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
    cursor: pointer;
}

.drawerItem {
    font-weight: 600;
}
</style>