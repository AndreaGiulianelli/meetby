import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import authService from '@/services/AuthorizationService.js'

export const useAuthStore = defineStore('auth', () => {
    const authToken = ref(null)
    const userId = ref(null)

    const isLoggedIn = computed(() => authToken.value != null)

    async function login(email, password) {
        const response = await authService.login(email, password)
        if (response) {
            authToken.value = response.accessToken
            userId.value = response.userId
            localStorage.setItem("authToken", authToken.value)
            localStorage.setItem("userId", userId.value)
            return true
        }
        return false
    }

    function logout() {
        authToken.value = null
        userId.value = null
        localStorage.removeItem("authToken")
        localStorage.removeItem("userId")
    }

    function initStore() {
        if (localStorage.getItem("authToken")) {
            authToken.value = localStorage.getItem("authToken")
        }
        if (localStorage.getItem("userId")) {
            userId.value = localStorage.getItem("userId")
        }
    }

    return { authToken, userId, isLoggedIn, login, logout, initStore }
})
