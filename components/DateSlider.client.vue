<template>

    <div>
        <v-range-slider
            thumb-label
            persistent-hint
            strict
            id="input-book-date"
            :color="sliderColor"
            :min="minYear"
            :max="maxYear"
            v-model="myDateRange"
            label="Date"
            step="1">
            <!-- @input="emit('update:modelValue', $event.target.value)">-->

            <!-- <template v-slot:thumb-label="{ modelValue }">
                modelValue
            </template>             -->
            
            <v-tooltip
                activator="parent"
                location="bottom">"always"</v-tooltip>
        </v-range-slider>
    </div>

</template>

<script setup>

// const model = defineModel({ type: Array });
import { reactive, watch } from "vue";

const sliderColor = ref("#9cd5ff");


const props = defineProps({

    maxYear: Number,
    minYear: Number
    // modelValue: Array
});

var minYearCopy = ref(1600);
var maxYearCopy = ref(1800);
var myDateRange = ref([1600, 1800]);

const emit = defineEmits(["update:modelValue"])

watch(myDateRange, async (p_newValue, p_oldValue) => {

    console.log(`watch myDateRange with ${p_newValue} and ${p_oldValue}`);

    emit("update:modelValue", p_newValue);
});

</script>