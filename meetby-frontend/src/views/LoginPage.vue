<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()

const isFormValid = ref(false)

const email = ref('')
const password = ref('')
const showLoginError = ref()
const showPassword = ref(false)

const store = useAuthStore()

const passwordRules = [
    value => {
        if (value) return true
        return 'Password is required.'
    }
]

const emailRules = [
    value => {
        if (value) return true
        return 'E-mail is requred.'
    },
    value => {
        if (/.+@.+\..+/.test(value)) return true
        return 'E-mail must be valid.'
    },
]

async function login() {
    if (isFormValid.value) {
        const logged = await store.login(email.value, password.value)
        if (logged) {
            router.push({ name: "home" })
            showLoginError.value = false
        } else {
            showLoginError.value = true
        }
    }    
}

</script>

<template>
    <v-row>
        <v-col cols="12" class="mb-2">
            <div class="px-6 pt-5 text-center">
                <h1 class="mb-2">Hey! Nice to see you again</h1>
                <p class="px-5">
                    Login to start <i>meetby</i> everybody
                </p>
            </div>
        </v-col>
    </v-row>
    <v-row>
        <v-spacer></v-spacer>
        <v-col cols="11" md="4" lg="3">
            <v-form v-model="isFormValid" @submit.prevent="login">
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field :rules="emailRules" bg-color="paletteGrey" v-model="email" label="Email" color="black" type="email" autocomplete="true" required/>
                            <v-text-field :rules="passwordRules" bg-color="paletteGrey" v-model="password" label="Password" :type="showPassword ? 'text' : 'password'" color="black" required 
                                @click:append-inner="showPassword = !showPassword" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" />
                            <div class="font-weight-bold text-paletteRed" v-if="showLoginError">Email or Password are incorrect</div>
                        </v-col>
                        <v-col cols="12" class="mt-3">
                            <v-btn block type="submit" class="black-btn" aria-label="Login">
                                Login
                            </v-btn>
                            <p class="font-weight-bold">Don’t have an account yet? <router-link to="/signup" class="text-paletteBlue">Sign up</router-link></p>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>
