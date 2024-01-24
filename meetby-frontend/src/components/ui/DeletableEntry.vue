<script setup>
defineProps({
    text: String,
})
const emit = defineEmits(['deleted'])

function deleted() {
    emit('deleted')
}
</script>

<template>
    <v-card
        color="paletteGrey"
        elevation="1"
        class="text-caption"
    >
        <template v-slot:title>
            <span class="text-button">{{ text }}</span>
        </template>

        <template v-slot:append>
            <v-icon 
                aria-label="Delete"
                aria-hidden="false"
                icon="mdi-close"
                color="paletteBlack"
                @click.prevent="deleted"
            ></v-icon>
        </template>
    </v-card>
</template>