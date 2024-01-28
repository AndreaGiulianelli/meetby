<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
    messages: Object,
    senderId: String,
    senderName: String,
    senderSurname: String,
})

const chatScrollList = ref(null)

watchEffect(async () => {
    if (chatScrollList.value && props.messages) {
        chatScrollList.value.scrollToIndex(chatScrollList.value.items.length)
    }
})

const emit = defineEmits(['msg-sent'])

const messageToSend = ref()

function sendMessage() {
    if (messageToSend.value.trim() != '') {
        emit('msg-sent', messageToSend.value)
        messageToSend.value = ''
        chatScrollList.value.scrollToIndex(chatScrollList.value.items.length)
    }
}
</script>

<template>
    <v-container class="d-flex flex-column h-100 px-0 py-0">
        <v-row class="flex-grow-1">
            <v-col cols="12" class="d-flex flex-column">
                <v-virtual-scroll :items="messages" height="100" ref="chatScrollList">
                    <template v-slot:default="{ item }">
                        <v-list-item
                            :class="['px-0', 'd-flex', { 'flex-row-reverse': item.sender.id == senderId }]"
                        >
                            <template v-slot:title>
                                <div class="bg-paletteGrey px-2 py-2 text-wrap rounded-lg">
                                    <p class="font-weight-bold" v-if="item.sender.id != senderId">{{ item.sender.name }} {{ item.sender.surname }}</p>
                                    <p>{{ item.message }}</p>
                                    <p class="d-flex flex-row-reverse text-caption font-weight-light">{{ new Date(item.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}</p>
                                </div>
                            </template>
                        </v-list-item>
                    </template>
                </v-virtual-scroll>
            </v-col>
        </v-row>
        <v-row class="flex-grow-0">
            <v-col cols="12" class="mb-1">
                <v-text-field
                    clearable
                    v-model="messageToSend"
                    class="font-weight-medium rounded"
                    hide-details="auto"
                    variant="solo"
                    bg-color="paletteBlue"
                    color="paletteWhite"
                    label="Message"
                    type="text"
                >
                    <template v-slot:append>
                        <v-btn 
                            class="rounded-circle bg-paletteBlue"
                            color="paletteWhite"
                            icon="mdi-send"
                            aria-label="Send message"
                            @click="sendMessage"
                        >
                        </v-btn>
                    </template>
                </v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>