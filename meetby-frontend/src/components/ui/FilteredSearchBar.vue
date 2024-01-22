<script setup>
import { ref, watchEffect } from 'vue';

const model = defineModel()
const filter = ref('')
const search = ref('')

watchEffect(() => {
    model.value = {
        filter: filter.value.toLowerCase(),
        search: search.value,
    }
})

</script>

<template>
    <v-container>
        <v-row no-gutters>
            <v-col cols="4" class="pr-2">
                <v-select
                    label="Type"
                    :items="['All', 'Planning', 'Planned']"
                    variant="solo-filled"
                    bg-color="paletteGrey"
                    v-model="filter"
                ></v-select>
            </v-col>
            <v-col cols="8" class="pl-2">
                <v-text-field 
                    label="Search"
                    variant="solo-filled"
                    append-inner-icon="mdi-magnify"
                    bg-color="paletteGrey"
                    v-model="search"
                    type="text"
                ></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>