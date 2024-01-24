<script setup>
import { ref, watchEffect } from 'vue'
import UserService from '@/services/UserService'
import { useAuthStore } from '@/stores/auth.js'

const emit = defineEmits(['searched-user'])
const store = useAuthStore()

const searchedUser = ref()
const userResults = ref([])

watchEffect(() => {
    if (searchedUser.value) {
        UserService.getUsersStarting(searchedUser.value).then(result => {
            userResults.value = result.filter((user) => user._id != store.userId)
        })
    }
})

function resultSelected(user) {
    emit('searched-user', user)
    userResults.value = []
}
</script>

<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-text-field clearable v-bind="props" hide-details="auto" bg-color="paletteGrey" v-model="searchedUser" label="Name/Surname/Username" color="black" type="text"/>
        </template>
        <v-list>
            <v-list-item
                v-for="userResult in userResults"
                :key="userResult._id"
                :value="userResult._id"
            >
            <v-list-item-title @click="resultSelected(userResult)">@{{ userResult.username }} - {{ userResult.name }} {{ userResult.surname }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
