<template>
    <v-row>
        <v-col cols="12">
            <div class="px-2 py-5 text-center">
                <p class="main-title font-weight-black mb-12">The place to coordinate your meet(by)</p>
                <p class="description px-5">
                    Let <span class="font-weight-black">meetby coordinate</span> your meetings with your friends, collegues, while <span class="font-weight-black">you have fun</span>.
                </p>
            </div>
        </v-col>
    </v-row>
    <v-row class="mt-16">
        <v-spacer></v-spacer>
        <v-col cols="10">
            <v-btn block class="black-btn" aria-label="Logout">
                Join and plan
            </v-btn>
            <p class="font-weight-bold">Already have an account? <span class="text-paletteBlue">Login</span></p>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>

<style scoped>
.main-title {
    font-size: 1.8em;
}
</style>