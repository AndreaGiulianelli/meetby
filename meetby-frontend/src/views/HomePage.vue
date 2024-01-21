<template>
    <v-row>
        <v-col cols="12">
            <div class="px-2 py-5 text-center">
                <p class="main-title font-weight-black mb-12">The place to coordinate your meet(by)</p>
                <p class="px-5">
                    Let <span class="font-weight-black">meetby coordinate</span> your meetings with your friends, collegues, while <span class="font-weight-black">you have fun</span>.
                </p>
            </div>
        </v-col>
    </v-row>
    <v-row class="mt-16">
        <v-spacer></v-spacer>
        <v-col cols="10" md="4" lg="3">
            <v-btn block class="black-btn" aria-label="Join and plan" to="/signup">
                Join and plan
            </v-btn>
            <p class="font-weight-bold">Already have an account? <router-link to="/login" class="text-paletteBlue">Login</router-link></p>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>