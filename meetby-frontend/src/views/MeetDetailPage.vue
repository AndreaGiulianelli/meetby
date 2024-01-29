<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { useSocketManagerStore } from '@/stores/socketManager.js'
import MeetDetails from '@/components/meet/MeetDetails.vue'
import TextChat from '@/components/chat/TextChat.vue'
import MeetsService from '@/services/MeetsService.js'
import { getDurationUnit, getDurationValue, getMeetStatus } from '@/utils/utils'

const route = useRoute()
const authStore = useAuthStore()
const socketManager = useSocketManagerStore()

const tab = ref('')
const meet = ref()
const meetChat = ref([])

if (route.query.guest) {
    MeetsService.get(route.params.meetId, route.query.guest).then(response => meet.value = response )
} else {
    MeetsService.get(route.params.meetId).then(response => meet.value = response )
    MeetsService.getChat(route.params.meetId).then(chat => meetChat.value = chat)
}

watchEffect(() => {
    if (socketManager.socket) {
        socketManager.socket.on("message:new", (message) => {
            if (message.meetId == route.params.meetId) {
                meetChat.value.push(message)
            }
        })
    }
})

function sendMessage(messageToSend) {
    if (socketManager.socket) {
        socketManager.socket.emit("message:new", {
            meetId: route.params.meetId,
            date: new Date(),
            message: messageToSend,
        })
    }
}

</script>

<template>
    <v-row class="flex-grow-1">
        <v-spacer></v-spacer>
        <v-col cols="12" md="6" lg="5" v-if="meet" class="d-flex flex-column flex-grow-1">
            <v-container class="d-flex flex-column flex-grow-1">
                <v-row class="flex-grow-0">
                    <v-col cols="8" class="pt-0 mb-2">
                        <h1>{{ meet.title }}</h1>
                        <p class="">by {{ meet.meetCreator.name}} {{ meet.meetCreator.surname }}</p>
                    </v-col>
                    <v-col cols="4" class="pt-0">
                        <p 
                            class="text-end mt-2 text-caption font-weight-bold"
                            :class="getMeetStatus(meet) == 'Planning' ? 'text-paletteOrange' : 'text-paletteGreen'"
                        >{{ getMeetStatus(meet) }} ●</p>
                    </v-col>
                </v-row>
                <v-row class="flex-grow-1 mt-0">
                    <v-col cols="12" class="d-flex flex-column flex-grow-1 pt-0">
                        <v-tabs v-model="tab" align-tabs="center">
                            <v-tab value="details" :class="{ 'font-weight-bold' : tab == 'details' }" class="text-subtitle-1">details</v-tab>
                            <v-tab v-if="!route.query.guest" value="chat" :class="{ 'font-weight-bold' : tab == 'chat' }" class="text-subtitle-1">chat</v-tab>
                        </v-tabs>
                        <v-window v-model="tab" class="d-flex flex-column flex-grow-1">
                            <v-window-item value="details" class="mi pt-5">
                                <MeetDetails
                                    :id="meet._id"
                                    :duration="getDurationValue(meet.duration)"
                                    :duration-unit="getDurationUnit(meet.duration)"
                                    :place="meet.place"
                                    :description="meet.description"
                                    :meeting-url="meet.meetingUrl"
                                    :meet-date="meet.plannedDateTime ? new Date(meet.plannedDateTime) : undefined"
                                    :guests="meet.invitedGuests"
                                    :users="meet.invitedUsers"
                                    :availabilities='meet.proposedAvailabilities'
                                    :creator-id="meet.meetCreator._id"
                                    :creator-name="meet.meetCreator.name"
                                    :creator-surname="meet.meetCreator.surname"
                                    :guest="route.query.guest"
                                />
                            </v-window-item>
                            <v-window-item v-if="!route.query.guest" value="chat" class="pt-5 is-light-mode flex-grow-1">
                                <TextChat
                                    :messages="meetChat"
                                    :senderId="authStore.userId"
                                    :senderName="authStore.name"
                                    :senderSurname="authStore.surname"
                                    @msg-sent="(messageToSend) => sendMessage(messageToSend)"
                                />
                            </v-window-item>
                        </v-window>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>

<style>
.v-window__container {
    flex-grow: 1;
}
</style>
