<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { parse, toSeconds } from 'iso8601-duration'
import DeletableEntry from '@/components/ui/DeletableEntry.vue'
import FutureDateTimePicker from '@/components/ui/FutureDateTimePicker.vue'
import SearchUser from '@/components/user/SearchUser.vue'
import MeetsService from '@/services/MeetsService.js'

const router = useRouter()
const route = useRoute()

const isFormValid = ref(false)

const title = ref()
const durationValue = ref()
const durationUnit = ref()
const place = ref()
const description = ref()
const hasOnlineMeeting = ref(false)
const meetingUrl = ref()
const availabilities = ref([])
const invitedGuests = ref([])
const invitedUsers = ref([])

const requiredField = [
    value => {
        if (value) return true
        return 'This field is required.'
    }
]

const urlRules = [
    value => {
        if (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(value)) return true
        return 'Url must be valid'
    }
]

// Add Person dialog
const addPersonDialog = ref(false)
const wantToAddGuest = ref(false)
const guestEmail = ref()
const emailRules = [
    value => {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) return true
        return 'E-mail must be valid.'
    },
]

// Check if the page is in edit mode
const isEdit = route.params.meetId ? true : false
const meetIdToBeEdited = route.params.meetId

if (isEdit) {
    MeetsService.get(meetIdToBeEdited).then(currentMeet => {
        title.value = currentMeet.title
        durationUnit.value = currentMeet.duration.slice(-1) == 'M' ? 'min' : 'hour'
        durationValue.value = toSeconds(parse(currentMeet.duration)) / (durationUnit.value == 'min' ? 60 : 3600)
        place.value = currentMeet.place
        description.value = currentMeet.description
        hasOnlineMeeting.value = currentMeet.meetingUrl ? true : false
        meetingUrl.value = currentMeet.meetingUrl
        availabilities.value = currentMeet.proposedAvailabilities.map(availability => new Date(availability.availability.split('/')[0]))
        invitedGuests.value = currentMeet.invitedGuests
        invitedUsers.value = currentMeet.invitedUsers
    })
}



function getDisplayDateTime(datetime) {
    const dateAndTime = datetime.split('T')
    return dateAndTime[0] + ' @ ' + dateAndTime[1]
}

async function submit() {
    if (isFormValid.value) {
        const duration = `PT${durationValue.value}${durationUnit.value == 'min' ? 'M' : 'H'}`
        const isoAvailabilities = availabilities.value.map(availability => {
            const endDate = new Date(availability.getTime())
            endDate.setSeconds(endDate.getSeconds() + toSeconds(parse(duration)))
            return `${availability.toISOString().split('.')[0]+"Z"}/${endDate.toISOString().split('.')[0]+"Z"}`
        })
        const newMeet = {
            title: title.value,
            duration: duration,
            place: place.value,
            description: description.value,
            meetingUrl: meetingUrl.value,
            proposedAvailabilities: isoAvailabilities,
            invitedUsers: invitedUsers.value.map(invitedUser => invitedUser._id),
            invitedGuests: invitedGuests.value.map(guest => guest),
        }

        if (!isEdit) {
            Object.keys(newMeet).forEach(key => newMeet[key] === undefined && delete newMeet[key])
        }

        const response = isEdit ? await MeetsService.update(meetIdToBeEdited, newMeet) : await MeetsService.create(newMeet)

        if (response) {
            router.replace({ name: 'meets' })
        }
    }    
}

</script>

<template>
    <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" md="6" lg="5">
            <v-form v-model="isFormValid" @submit.prevent="submit">
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <h1 v-if="!isEdit">Create a new meet</h1>
                            <h1 v-else>Edit meet</h1>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <h2 class="text-paletteBlue mb-4">Details</h2>
                            <v-text-field :rules="requiredField" class="mb-3" hide-details="auto" bg-color="paletteGrey" v-model="title" label="Title*" color="black" type="text" required/>
                            <v-container class="pa-0">
                                <v-row>
                                    <v-col cols="4" class="pb-1">
                                        <v-text-field :rules="requiredField" class="mb-3" hide-details="auto" bg-color="paletteGrey" v-model="durationValue" label="Duration*" color="black" type="number" required/>                                    
                                    </v-col>
                                    <v-col cols="5" class="pb-1">
                                        <v-select
                                            label="Type"
                                            :rules="requiredField"
                                            :items="['min', 'hour']"
                                            variant="solo-filled"
                                            bg-color="paletteGrey"
                                            v-model="durationUnit"
                                        ></v-select>    
                                    </v-col>
                                    <v-spacer></v-spacer>
                                </v-row>
                            </v-container>
                            <v-text-field class="mb-3" hide-details="auto" bg-color="paletteGrey" v-model="place" label="Place" color="black" type="text"/>
                            <v-textarea class="mb-3" hide-details="auto" bg-color="paletteGrey" v-model="description" label="Description" color="black" type="text"/>
                            <v-switch 
                                label="Online meeting" 
                                inset
                                color="paletteBlue"
                                v-model="hasOnlineMeeting"
                                @update:model-value="(switched) => { if (!switched) { meetingUrl = null } }"
                                hide-details="auto"
                            ></v-switch>
                            <v-text-field v-if="hasOnlineMeeting" :rules="urlRules" class="mb-3" hide-details="auto" bg-color="paletteGrey" v-model="meetingUrl" label="Meeting url" color="black" type="text"/>
                        </v-col>

                        <v-col cols="12">
                            <v-container class="pa-0">
                                <v-row>
                                    <v-col cols="8">
                                        <h2 class="text-paletteBlue">Availabilities</h2>
                                    </v-col>
                                    <v-col cols="4">
                                        <FutureDateTimePicker @new-date="(date) => availabilities.push(date)"> 
                                            <v-btn class="black-btn py-3 px-2" block aria-label="Add availability">Add</v-btn>
                                        </FutureDateTimePicker>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <DeletableEntry
                                            v-for="availability in availabilities"
                                            :key="availability.toISOString()"
                                            :text="getDisplayDateTime(availability.toISOString())"
                                            @deleted="availabilities.splice(availabilities.indexOf(availability), 1)"
                                            class="mb-2"
                                        />
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-col>

                        <v-col cols="12">
                            <v-container class="pa-0">
                                <v-row>
                                    <v-col cols="8">
                                        <h2 class="text-paletteBlue">People</h2>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-dialog width="auto" v-model="addPersonDialog">
                                            <template v-slot:activator="{ props }">
                                                <v-btn v-bind="props" class="black-btn py-3 px-2" block aria-label="Add person">Add</v-btn>
                                            </template>

                                            <v-card>
                                                <v-card-title class="pb-0 font-weight-bold mr-10">
                                                    Select a person to add 
                                                </v-card-title>
                                                <v-card-text class="pt-0">
                                                    <v-switch 
                                                        label="Add guest" 
                                                        inset
                                                        color="paletteBlue"
                                                        v-model="wantToAddGuest"
                                                        hide-details="auto"
                                                    ></v-switch>

                                                    <v-text-field :rules="emailRules" clearable v-if="wantToAddGuest" class="mb-3" hide-details="auto" bg-color="paletteGrey" v-model="guestEmail" label="Guest email" color="black" type="text"/>
                                                    <SearchUser v-else @searched-user="(user) => {addPersonDialog = false; invitedUsers.push(user)}" />

                                                </v-card-text>
                                                <v-card-actions v-if="wantToAddGuest">
                                                    <v-spacer></v-spacer>
                                                    <v-btn
                                                        color="paletteBlue"
                                                        variant="text"
                                                        @click="{addPersonDialog = false; invitedGuests.push(guestEmail); guestEmail = ''}"
                                                        aria-label="Add guest"
                                                    >Add guest</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <DeletableEntry
                                            v-for="user in invitedUsers"
                                            :key="user._id"
                                            :text="`${user.name} ${user.surname}`"
                                            @deleted="invitedUsers.splice(invitedUsers.map(u => u._id).indexOf(user._id), 1)"
                                            class="mb-2"
                                        />
                                        <DeletableEntry
                                            v-for="guest in invitedGuests"
                                            :key="guest"
                                            :text="guest"
                                            @deleted="invitedGuests.splice(invitedGuests.indexOf(guest), 1)"
                                            class="mb-2"
                                        />
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="mt-3">
                            <v-btn block type="submit" class="black-btn" aria-label="Create">
                                <span v-if="!isEdit">Create</span>
                                <span v-else>Save</span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>