<script setup>
defineProps({
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
                    :title="title"
                    :subtitle="`by ${creator}`"
                    elevation="4"
                    :to='`/meets/${id}`'
                >
                    <template v-slot:append>
                        <p 
                            class="mb-3 px-2 py-1 text-caption bg-paletteWhite rounded-lg font-weight-bold"
                            :class="status == 'Planning' ? 'text-paletteOrange' : 'text-paletteGreen'"
                        >{{ status }} ●</p>
                    </template>

                    <v-card-text class="pt-2">
                        <v-icon size="small" icon="mdi-account-group"></v-icon>
                        <span class="text-caption font-weight-light">
                            {{ ` ${partecipants} ${partecipants === 1 ? 'partecipant' : 'partecipants'}` }}
                        </span>
                    </v-card-text>

                    <v-card-actions v-if="editable">
                        <v-spacer></v-spacer>
                        <v-btn append-icon="mdi-pencil" aria-label="Edit meet" :to="`/meets/${id}/edit`">Edit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>