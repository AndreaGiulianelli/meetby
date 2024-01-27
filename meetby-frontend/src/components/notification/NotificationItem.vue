<script setup>
defineProps({
    notificationId: String,
    html: String,
    date: Date,
    read: Boolean,
})

const emit = defineEmits(['notification-click'])

function notificationClicked() {
    emit('notification-click')
}
</script>

<template>
    <v-list-item
        @click="notificationClicked"
        :value="notificationId"
        :subtitle="date.toLocaleString()"
        class="px-0 rounded"
    >
        <template v-slot:title>
            <p class="text-wrap" v-html="html"></p>
        </template>
        <template v-slot:append v-if="!read">
            <span class="text-paletteBlue pr-2">●</span>
        </template>
    </v-list-item>
    <v-divider></v-divider>
</template>