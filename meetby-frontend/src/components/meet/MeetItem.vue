<script setup>
const props = defineProps({
    id: String,
    title: String,
    creator: String,
    partecipants: Number,
    status: String,
    editable: Boolean,
})
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="pt-0 pb-2">
                <v-card
                    color="paletteBlue"
                    :title="props.title"
                    :subtitle="`by ${props.creator}`"
                    elevation="4"
                    to="/"
                >
                    <template v-slot:append>
                        <p 
                            class="mb-3 px-2 py-1 text-caption bg-paletteWhite rounded-lg font-weight-bold"
                            :class="props.status == 'Planning' ? 'text-paletteOrange' : 'text-paletteGreen'"
                        >{{ props.status }} ●</p>
                    </template>

                    <v-card-text class="pt-2">
                        <v-icon size="small" icon="mdi-account-group"></v-icon>
                        <span class="text-caption font-weight-light">
                            {{ ` ${props.partecipants} ${props.partecipants === 1 ? 'partecipant' : 'partecipants'}` }}
                        </span>
                    </v-card-text>

                    <v-card-actions v-if="editable">
                        <v-spacer></v-spacer>
                        <v-btn append-icon="mdi-pencil" to="/">Edit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>