import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import authService from '@/services/AuthorizationService.js'

export const useAuthStore = defineStore('auth', () => {
    const authToken = ref(null)

    const isLoggedIn = computed(() => authToken.value != null)

    async function login(email, password) {
        const response = await authService.login(email, password)
        if (response) {
            authToken.value = response
            return true
        }
        return false
    }

    function logout() {
        authToken.value = null
    }

    return { authToken, isLoggedIn, login, logout }
})
