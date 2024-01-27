import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import authService from '@/services/AuthorizationService.js'

export const useAuthStore = defineStore('auth', () => {
    const authToken = ref(null)
    const userId = ref(null)
    const name = ref(null)
    const surname = ref(null)
    const username = ref(null)

    const isLoggedIn = computed(() => authToken.value != null)

    async function login(email, password) {
        const response = await authService.login(email, password)
        if (response) {
            authToken.value = response.accessToken
            userId.value = response.userId
            name.value = response.name
            surname.value = response.surname
            username.value = response.username
            localStorage.setItem("authToken", authToken.value)
            localStorage.setItem("userId", userId.value)
            localStorage.setItem("name", name.value)
            localStorage.setItem("surname", surname.value)
            localStorage.setItem("username", username.value)
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
        if (localStorage.getItem("authToken") 
            && localStorage.getItem("userId")
            && localStorage.getItem("name")
            && localStorage.getItem("surname")
            && localStorage.getItem("username")
        ) {
            authToken.value = localStorage.getItem("authToken")
            userId.value = localStorage.getItem("userId")
            name.value = localStorage.getItem("name")
            surname.value = localStorage.getItem("surname")
            username.value = localStorage.getItem("username")
        }
    }

    return { authToken, userId, name, surname, username, isLoggedIn, login, logout, initStore }
})
