import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const authToken = ref(null)

    const isLoggedIn = computed(() => authToken.value != null)

    function login() {
        // TODO: implement login
    }

    function logout() {
        authToken.value = null
    }

    return { authToken, isLoggedIn, login, logout }
})
