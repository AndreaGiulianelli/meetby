<script setup>
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notification.js'
import NotificationItem from '@/components/notification/NotificationItem.vue'

const router = useRouter()
const notificationStore = useNotificationStore()

function mapNotificationToHtml(notification) {
    let text
    switch (notification.type) {
        case 'meet:invited':
            text = `You have been invited to <span class='font-weight-bold'>${notification.data.meetTitle}</span>`
            break
        
        case 'meet:updated':
            text = `<span class='font-weight-bold'>${notification.data.meetTitle}</span> has been modified`
            break
        
        case 'meet:deleted':
            text = `<span class='font-weight-bold'>${notification.data.meetTitle}</span> has been deleted`
            break
        
        case 'meet:planned':
            text = `<span class='font-weight-bold'>${notification.data.meetTitle}</span> has been planned`
            break

        default:
            text = null
    }
    return text
}

async function clickNotification(notification) {
    if (!notification.read) {
        await notificationStore.readNotification(notification.id)
    }
    if (notification.type != 'meet:deleted') {
        router.push({ name: 'meetDetail', params: { meetId: notification.meetId }})
    }
}
</script>

<template>
    <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" md="6" lg="5">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <h1>Notifications</h1>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                            <v-list lines="two">
                                <NotificationItem
                                    v-for="notification in notificationStore.notifications"
                                    :key="notification.id"
                                    :notificationId="notification.id"
                                    :html="mapNotificationToHtml(notification)"
                                    :date="new Date(notification.date)"
                                    :read="notification.read"
                                    @notification-click = "clickNotification(notification)"
                                />
                            </v-list>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>