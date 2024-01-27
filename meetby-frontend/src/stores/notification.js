import { ref, computed, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { useSocketManagerStore } from '@/stores/socketManager.js'
import NotificationService from '@/services/NotificationService'

export const useNotificationStore = defineStore('notification', () => {
    const notifications = ref([])
    const unreadNotificationCounter = computed(() => notifications.value.filter((notification) => !notification.read).length)

    const socketManager = useSocketManagerStore()

    watchEffect(async () => {
        if (socketManager.socket) {
            notifications.value = await NotificationService.getAll()

            socketManager.socket.on("notification", (notification) => {
                if (!notifications.value.includes(notification)) {
                    notifications.value.push(notification)
                }
            })
        } else {
            notifications.value = []
        }
    })

    async function readNotification(notificationId) {
        if (notifications.value) {
            const read = await NotificationService.markAsRead(notificationId)
            if (read) {
                notifications.value[notifications.value.findIndex((notification) => notification.id == notificationId)].read = true
            }
        }
    }


    return { notifications, unreadNotificationCounter, readNotification }
})