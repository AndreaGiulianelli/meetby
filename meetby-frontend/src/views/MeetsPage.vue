<script setup>
import { ref, watchEffect, } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { getEndDate, getMeetStatus } from '@/utils/utils'
import FilteredSearchBar from '@/components/ui/FilteredSearchBar.vue'
import MeetItem from '@/components/meet/MeetItem.vue'
import { Qalendar } from "qalendar"
import "qalendar/dist/style.css";
import MeetsService from '@/services/MeetsService.js'

const tab = ref('')
const meets = ref()
const search = ref('')

const router = useRouter()
const store = useAuthStore()

watchEffect(() => {
    setMeets(search.value.filter, (meet) => meet.title.toLowerCase().includes(search.value.search.toLowerCase()))
})

setMeets()

function setMeets(status, filter) {
    MeetsService.getAll(status).then(response => { meets.value = response.filter((value) => filter ? filter(value) : true) })
}

function leadingZero(number) {
    return number >= 10 ? number : '0' + `${number}`
}

function adaptDateToQalendar(isoDate) {
    return `${isoDate.getFullYear()}-${leadingZero(isoDate.getMonth() + 1)}-${leadingZero(isoDate.getDate())} ${leadingZero(isoDate.getHours())}:${ leadingZero(isoDate.getMinutes())}`
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
                        :status="getMeetStatus(meet)"
                        :editable="meet.meetCreator._id === store.userId && !meet.plannedDateTime"
                    />

                    <v-btn class="fab" aria-label="Create a meet" aria-hidden="false" icon="mdi-plus" size="large" color="paletteBlack" elevation="2" to="/meets/new" />
                </v-window-item>
                <v-window-item value="calendar" class="pt-5 is-light-mode">
                    <Qalendar
                        :selectedDate="new Date()"
                        :events="meets.filter((meet) => getMeetStatus(meet) != 'Planning').map((meet) => {
                            return {
                                title: meet.title,
                                time: { start: adaptDateToQalendar(new Date(meet.plannedDateTime)), end: adaptDateToQalendar(getEndDate(new Date(meet.plannedDateTime), meet.duration)) },
                                color: 'blue',
                                isEditable: false,
                                id: meet._id,
                            }
                        })"
                        :config="{
                            locale: 'en-US',
                            week: {
                                startsOn: 'monday'
                            },
                            style: {
                                fontFamily: ['Roboto', 'sans-serif'],
                            },
                            defaultMode: 'month',
                        }"
                        @event-was-clicked="(event) => router.push({ name: 'meetDetail', params: { meetId: event.clickedEvent.id } })"
                    />
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