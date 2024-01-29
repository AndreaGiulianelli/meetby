<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/AuthorizationService.js'

const router = useRouter()

const isFormValid = ref(false)

const name = ref('')
const surname = ref('')
const username = ref('')
const email = ref('')
const password = ref('')

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const showEmailError = ref(false)
const showUsernameError = ref(false)

const nameRules = [
    value => {
        if (value) return true
        return 'Name is required.'
    }
]

const surnameRules = [
    value => {
        if (value) return true
        return 'Surname is required.'
    }
]

const usernameRules = [
    value => {
        if (value) return true
        return 'Username is required.'
    }
]

const passwordRules = [
    value => {
        if (value) return true
        return 'Password is required.'
    },
    value => {
        if (value.length >=8) return true
        return 'Min 8 characters'
    }
]

const confirmPasswordRules = [
    value => {
        if (value === password.value) return true
        return 'The two password are different.'
    }
]

const emailRules = [
    value => {
        if (value) return true
        return 'E-mail is requred.'
    },
    value => {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) return true
        return 'E-mail must be valid.'
    },
]


async function signup() {
    if (isFormValid.value) {
        showEmailError.value = false
        showUsernameError.value = false

        const response = await authService.signup({
            name: name.value,
            surname: surname.value,
            username: username.value,
            email: email.value,
            password: password.value,
        })
        if (response.success) {
            router.replace({ name: "login" })
        } else if (response.error === "username") {
            showUsernameError.value = true
        } else {
            showEmailError.value = true
        }
    }
}

</script>

<template>
    <v-row class="flex-grow-0">
        <v-col cols="12" class="mb-2">
            <div class="px-6 pt-5 text-center">
                <h1 class="mb-2">Create your meetby account</h1>
            </div>
        </v-col>
    </v-row>
    <v-row>
        <v-spacer></v-spacer>
        <v-col cols="11" md="4" lg="3">
            <v-form v-model="isFormValid" @submit.prevent="signup" autocomplete="on">
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field class="mb-3" hide-details="auto" :rules="nameRules" bg-color="paletteGrey" v-model="name" label="Name" color="black" type="text" required/>
                            <v-text-field class="mb-3" hide-details="auto" :rules="surnameRules" bg-color="paletteGrey" v-model="surname" label="Surname" color="black" type="text" required/>
                            <v-text-field class="mb-3" hide-details="auto" :rules="usernameRules" bg-color="paletteGrey" v-model="username" label="Username" color="black" type="text" required/>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field class="mb-3" hide-details="auto" :rules="emailRules" bg-color="paletteGrey" v-model="email" label="Email" color="black" type="email" required/>
                            <v-text-field class="mb-3" hide-details="auto" :rules="passwordRules" hint="At least 8 characters" bg-color="paletteGrey" v-model="password" label="Password" 
                                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'" color="black" @click:append-inner="showPassword = !showPassword" required />
                            <v-text-field class="mb-3" hide-details="auto" :rules="confirmPasswordRules" bg-color="paletteGrey" label="Confirm password" :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showConfirmPassword ? 'text' : 'password'" color="black" @click:append-inner="showConfirmPassword = !showConfirmPassword" required />
                        </v-col>
                        <v-col cols="12">
                            <div class="font-weight-bold text-paletteRed" v-if="showEmailError">Email already registered</div>
                            <div class="font-weight-bold text-paletteRed" v-if="showUsernameError">Username already registered</div>
                        </v-col>
                        <v-col cols="12" class="mt-3">
                            <v-btn block type="submit" class="black-btn" aria-label="Signup">
                                Sign Up
                            </v-btn>
                            <p class="font-weight-bold">Already have an account? <router-link to="/login" class="text-paletteBlue">Login</router-link></p>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>
