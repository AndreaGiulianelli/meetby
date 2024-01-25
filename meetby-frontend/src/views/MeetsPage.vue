<script setup>
import { ref, watchEffect, } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import FilteredSearchBar from '@/components/ui/FilteredSearchBar.vue'
import MeetItem from '@/components/meet/MeetItem.vue'
import MeetsService from '@/services/MeetsService.js'

const tab = ref('')
const meets = ref([])
const search = ref('')

const store = useAuthStore()

watchEffect(() => {
    setMeets(search.value.filter, (meet) => meet.title.toLowerCase().includes(search.value.search.toLowerCase()))
})

setMeets()

function setMeets(status, filter) {
    MeetsService.getAll(status).then(response => { meets.value = response.filter((value) => filter ? filter(value) : true) })
}
</script>

<template>
    <v-row class="h-100">
        <v-spacer></v-spacer>
        <v-col cols="12" md="6" lg="4">
            <v-tabs v-model="tab" align-tabs="center">
                <v-tab value="meets" :class="{ 'font-weight-bold' : tab == 'meets' }" class="text-subtitle-1">meets</v-tab>
                <v-tab value="calendar" :class="{ 'font-weight-bold' : tab == 'calendar' }" class="text-subtitle-1">calendar</v-tab>
            </v-tabs>

            <v-window v-model="tab" class="h-100">
                <v-window-item value="meets" class="mi h-100 pt-5">
                    <FilteredSearchBar v-model="search" class="pb-0"/>

                    <MeetItem 
                        v-for="meet in meets"
                        :key="meet._id"
                        :id="meet._id"
                        :title="meet.title"
                        :creator="meet.meetCreator.name + ' ' + meet.meetCreator.surname"
                        :partecipants="meet.invitedUsers.length + meet.invitedGuests.length + 1"
                        :status="meet.plannedDateTime ? 'Planned' : 'Planning'"
                        :editable="meet.meetCreator._id === store.userId"
                    />

                    <v-btn class="fab" aria-label="Create a meet" aria-hidden="false" icon="mdi-plus" size="large" color="paletteBlack" elevation="2" to="/meets/new" />
                </v-window-item>
                <v-window-item value="calendar" class="pt-5">
                    Calendar
                </v-window-item>
            </v-window>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>

<style scoped>
.fab {
    position: fixed;   
    bottom: 56px;
    right: 16px;
}
</style>