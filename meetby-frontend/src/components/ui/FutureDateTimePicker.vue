<script setup>
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits(['new-date'])

const datePicker = ref()
const datePickerInSelectionDate = ref(new Date()) // date that is temporary selected by the user in the date picker
const datePickerDate = ref(new Date()) // selected date in the date picker
const selectDateDisabled = ref(false) // if the date is in the past the btn must be disabled

// handle temporary date selection
const handleInternal = (date) => {
    datePickerInSelectionDate.value = date
    if (datePickerInSelectionDate.value > new Date()) {
        selectDateDisabled.value = false
    } else {
        selectDateDisabled.value = true
    }
}

// handle selected date in the picker
const selectDate = () => {
    if (datePickerInSelectionDate.value > new Date()) {
        datePicker.value.selectDate();
        emit('new-date', datePickerDate.value)
    }
}
</script>

<template>
    <VueDatePicker v-model="datePickerDate" @internal-model-change="handleInternal" :min-date="new Date()" select-text="Add" ref="datePicker">
        <template #trigger>
            <slot></slot>
        </template>
        <template #action-buttons>
            <v-btn class="blue-btn py-1 px-4" :disabled="selectDateDisabled" block aria-label="Select date and add" @click.prevent="selectDate">Add</v-btn>
        </template>
    </VueDatePicker>
</template>
