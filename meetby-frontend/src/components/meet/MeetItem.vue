<script setup>
const props = defineProps({
    id: String,
    title: String,
    creator: String,
    partecipants: Number,
    status: String
})
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="pt-0 pb-2">
                <v-card color="paletteBlue" elevation="4" link @click.prevent="console.log(id)">
                    <v-card-title class="pb-0">{{ props.title }}</v-card-title>
                    <v-card-subtitle>by {{ props.creator }}</v-card-subtitle>

                    <v-card-text class="pt-2">
                        <v-icon size="small" icon="mdi-account-group"></v-icon>
                        <span class="text-caption font-weight-light">
                            {{ ` ${props.partecipants} ${props.partecipants === 1 ? 'partecipant' : 'partecipants'}` }}
                        </span>

                        <v-row>
                            <v-col cols="12" class="d-flex flex-row-reverse">
                                <span 
                                    class="px-2 py-1 text-caption bg-paletteWhite rounded-lg font-weight-bold"
                                    :class="props.status == 'Planning' ? 'text-paletteOrange' : 'text-paletteGreen'"
                                >{{ props.status }} ●</span>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>