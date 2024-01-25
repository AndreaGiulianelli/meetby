<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { parse, toSeconds } from 'iso8601-duration'
import MeetDetails from '@/components/meet/MeetDetails.vue'
import MeetsService from '@/services/MeetsService.js'

const route = useRoute()

const meet = ref()
MeetsService.get(route.params.meetId).then(response => meet.value = response )
</script>

<template>
    <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" md="6" lg="5" v-if="meet">
            <v-container>
                <v-row>
                    <v-col cols="8" class="mb-2">
                        <h1>{{ meet.title }}</h1>
                        <p class="">by {{ meet.meetCreator.name}} {{ meet.meetCreator.surname }}</p>
                    </v-col>
                    <v-col cols="4">
                        <p 
                            class="text-end mt-2 text-caption font-weight-bold"
                            :class="'Planning' == 'Planning' ? 'text-paletteOrange' : 'text-paletteGreen'"
                        >Planning ●</p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <MeetDetails
                            :id="meet._id"
                            :duration="toSeconds(parse(meet.duration)) / (meet.duration.slice(-1) == 'M' ? 60 : 3600)"
                            :durationUnit="meet.duration.slice(-1) == 'M' ? 'min' : 'hour'"
                            :place="meet.place"
                            :description="meet.description"
                            :meeting-url="meet.meetingUrl"
                            :meet-date="meet.plannedDateTime"
                            :guests="meet.invitedGuests"
                            :users="meet.invitedUsers"
                            :availabilities='meet.proposedAvailabilities'
                            :creatorId="meet.meetCreator._id"
                        />
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>
