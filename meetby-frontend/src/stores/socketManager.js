import { ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { io } from "socket.io-client"
import { useAuthStore } from './auth'

export const useSocketManagerStore = defineStore('socketManager', () => {
    const socket = ref(null)

    const authStore = useAuthStore()

    watchEffect(() => {
        if (authStore.isLoggedIn) {
            socket.value = io(import.meta.env.VITE_MEETBY_BACKEND_BASE_URL, {
                auth: {
                    token: authStore.authToken
                }
            })
        } else if(socket.value) {
            socket.value.disconnect()
            socket.value = null
        }        
    })

    return { socket }
})