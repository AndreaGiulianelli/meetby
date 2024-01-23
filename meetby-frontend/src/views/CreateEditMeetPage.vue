<script setup>
import { ref } from 'vue'

const durationUnit = ref()
const hasOnlineMeeting = ref(false)
const availabilities = ref()
const people = ref()

const requiredField = [
    value => {
        if (value) return true
        return 'This field is required.'
    }
]

function submit() {

}

</script>

<template>
    <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" md="6" lg="5">
            <v-form @submit.prevent="submit">
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <h1>Create a new meet</h1>
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
                                hide-details="auto"
                                class=""
                            ></v-switch>
                            <v-text-field v-if="hasOnlineMeeting" class="mb-3" hide-details="auto" bg-color="paletteGrey" v-model="meetingUrl" label="Meeting url" color="black" type="text"/>
                        </v-col>

                        <v-col cols="12">
                            <v-container class="pa-0">
                                <v-row>
                                    <v-col cols="8">
                                        <h2 class="text-paletteBlue">Availabilities</h2>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-btn class="black-btn py-3 px-2" block aria-label="Add availability">Add</v-btn>
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
                                        <v-btn class="black-btn py-3 px-2" block aria-label="Add person">Add</v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>