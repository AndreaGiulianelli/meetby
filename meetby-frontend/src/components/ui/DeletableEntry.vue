<script setup>
import { ref } from 'vue'

defineProps({
    text: String,
})
const emit = defineEmits(['deleted'])

const deleteDialog = ref(false)

function deleted() {
    emit('deleted')
    deleteDialog.value = false
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
            <v-dialog width="auto" persistent v-model="deleteDialog">
                <template v-slot:activator="{ props }">
                    <v-icon 
                        aria-label="Delete"
                        aria-hidden="false"
                        icon="mdi-close"
                        color="paletteBlack"
                        v-bind="props"
                    ></v-icon>
                </template>
                <v-card class="py-5">
                        <v-card-title class="font-weight-bold">
                            Delete the entry?
                        </v-card-title>
                        <v-card-text class="pt-0 px-4">Do you really want to delete the entry '<span class="font-weight-bold">{{ text }}</span>'?</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="paletteBlack"
                                variant="text"
                                aria-label="No"
                                @click="deleteDialog = false"
                            >No</v-btn>
                            <v-btn
                                color="paletteRed"
                                variant="text"
                                aria-label="Yes"
                                @click="deleted"
                            >Yes</v-btn>
                        </v-card-actions>
                    </v-card>
            </v-dialog>
        </template>
    </v-card>
</template>