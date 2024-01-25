<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import MeetsService from '@/services/MeetsService.js'

const router = useRouter()
const store = useAuthStore()

const props = defineProps({
    id: String,
    duration: Number,
    durationUnit: String,
    place: String,
    description: String,
    meetingUrl: String,
    meetDate: Object,
    guests: Object,
    users: Object,
    availabilities: Object,
    creatorId: String,
    creatorName: String,
    creatorSurname: String,
    guest: String,
})

const leaveDialog = ref(false)
const deleteDialog = ref(false)
const newAvailabilities = ref()

if (props.guest) {
    newAvailabilities.value = props.availabilities.filter(availability => availability.availableGuests.includes(props.guest)).map(availability => availability.availability)
} else {
    newAvailabilities.value = props.availabilities.filter(availability => availability.availableUsers.includes(store.userId)).map(availability => availability.availability)
}
</script>

<template>
    <v-container class="pa-0">
        <v-row>
            <v-col cols="12">
                <h2>Description</h2>
                <p class="mb-1"><span class="font-weight-bold text-paletteBlue">Duration: </span>{{ duration }} {{ durationUnit }}</p>
                <p class="mb-1" v-if="place"><span class="font-weight-bold text-paletteBlue">Place: </span>{{ place }}</p>
                <span class="font-weight-bold text-paletteBlue" v-if="description">Description: </span>
                <p class="mb-1" v-if="description">{{ description }}</p>
                <p class="mb-1" v-if="meetingUrl"><span class="font-weight-bold text-paletteBlue">Meeting url: </span>{{ meetingUrl }}</p>
                <p class="mb-1" v-if="meetDate"><span class="font-weight-bold text-paletteBlue">Meet date: </span>{{ meetDate.toLocaleString() }}</p>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <h2 v-if="!meetDate">Invited people</h2>
                <h2 v-if="meetDate">Partecipants</h2>
                <ol class="px-8 py-4 bg-paletteGrey rounded">
                    <li
                        v-for="user in users"
                        :key="user._id"
                    >{{ user.name }} {{ user.surname }}</li>
                    <li
                        v-for="guest in guests"
                        :key="guest"
                    >{{ guest }}</li>
                </ol>
            </v-col>
        </v-row>

        <v-row v-if="!meetDate">
            <v-col cols="12">
                <h2>Availabilities</h2>
                <v-container class="px-3">
                    <v-row 
                        v-for="availability in availabilities"
                        :key="availability.availability"
                        class="px-1 py-2 bg-paletteGrey rounded mb-1"
                    >
                        <v-col cols="10" class="pt-4">
                            <span class="font-weight-bold">{{ new Date(availability.availability.split('/')[0]).toLocaleString() }}</span>
                            <p>Selected by:</p>
                            <ol class="px-8">
                                <li
                                    v-for="user in availability.availableUsers"
                                    :key="user"
                                >{{ user != creatorId ? users.find((elem) => elem._id == user).name : creatorName }} {{ user != creatorId ? users.find((elem) => elem._id == user).surname : creatorSurname }}</li>
                                <li
                                    v-for="guest in availability.availableGuests"
                                    :key="guest"
                                >{{ guest }}</li>
                            </ol>
                        </v-col>
                        <v-col cols="2" class="py-0">
                            <v-checkbox
                                v-model="newAvailabilities"
                                :value="availability.availability"
                            ></v-checkbox>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>

        <v-row>
            <v-spacer></v-spacer>
                <v-col cols="12" md="6" class="pb-0 pb-md-0" v-if="!meetDate">
                    <v-btn block class="black-btn" aria-label="Save" @click="MeetsService.setPersonalAvailabilities(id, newAvailabilities, guest).then(res => { if(!guest) { router.back() } else { router.go() } })">
                        Save
                    </v-btn>
                </v-col>
            <v-col cols="12" md="6" class="pt-2 pt-md-3" v-if="creatorId != store.userId && (!meetDate || meetDate.getTime() > new Date().getTime())">
                <v-dialog width="auto" persistent v-model="leaveDialog">
                    <template v-slot:activator="{ props }">
                        <v-btn block class="red-btn" aria-label="Leave meeting" v-bind="props">
                            Leave meeting
                        </v-btn>
                    </template>
                    <v-card class="py-5">
                        <v-card-title class="font-weight-bold">
                            Leave the meeting?
                        </v-card-title>
                        <v-card-text class="pt-0 px-4">Do you really want to leave this meeting? This operation cannot be undone.</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="paletteBlack"
                                variant="text"
                                aria-label="No"
                                @click="leaveDialog = false"
                            >No</v-btn>
                            <v-btn
                                color="paletteRed"
                                variant="text"
                                aria-label="Yes"
                                @click="MeetsService.leaveMeeting(id, guest).then(res => { leaveDialog = false; if (!guest) { router.back() } else { router.push({ name: 'home' }) } })"
                            >Yes</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
            <v-col cols="12" md="6" class="pt-2 pt-md-3" v-if="creatorId == store.userId && (!meetDate || meetDate.getTime() > new Date().getTime())">
                <v-dialog width="auto" persistent v-model="deleteDialog">
                    <template v-slot:activator="{ props }">
                        <v-btn block class="red-btn" aria-label="Delete meeting" v-bind="props">
                            Delete meeting
                        </v-btn>
                    </template>
                    <v-card class="py-5">
                        <v-card-title class="font-weight-bold">
                            Delete the meeting?
                        </v-card-title>
                        <v-card-text class="pt-0 px-4">Do you really want to delete this meeting? This operation cannot be undone.</v-card-text>
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
                                @click="MeetsService.delete(id).then(res => { deleteDialog = false; router.back()})"
                            >Yes</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>