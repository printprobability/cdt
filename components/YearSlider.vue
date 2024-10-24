<template>
  <div class="d-flex align-center ga-2">
    <v-range-slider
      :model-value="yearRange"
      :min="props.minYear"
      :max="props.maxYear"
      strict
      step="1"
      label="Year"
      messages="a"
      @end="emit('end')"
      @update:model-value="emitValue($event)"
    >
      <template #message>
        <div class="d-flex" style="width: 100%">
          <TextField class="year-entry" density="compact" type="number" @end="onEditEntryEnd"
                     v-model="from" label="From"/>
          <v-spacer/>
          <TextField class="year-entry" density="compact" type="number" @end="onEditEntryEnd"
                     v-model="to" label="To"/>
        </div>
      </template>
      <template #details></template>
    </v-range-slider>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";

const props = defineProps({
  modelValue: {type: Object},
  maxYear: {type: Number, default: 1700},
  minYear: {type: Number, default: 1660},
});

const emit = defineEmits(["update:modelValue", "end"]);

// Apply to model
const emitValue = (value) => emit('update:modelValue', {yearEarly: value[0], yearLate: value[1]})

// Year range array
const yearRange = computed(() => [
  props.modelValue?.yearEarly,
  props.modelValue?.yearLate,
]);

// Date entry model
const from = ref(`${yearRange.value[0]}`)
const to = ref(`${yearRange.value[1]}`)

// Watch if year range is changed, then update year entry model
watch(yearRange, (value) => {
  from.value = `${value[0]}`
  to.value = `${value[1]}`
})

// Enforce a ref value in a range
const getInRange = (value, min, max) => {
  if (value < min) return min
  if (value > max) return max

  return value
}

// On end editing year entry
const onEditEntryEnd = () => {
  // Emit value
  emitValue([
    getInRange(Number(from.value), props.minYear, Number(to.value)),
    getInRange(Number(to.value), Number(from.value), props.maxYear)
  ])
  // Emit end
  emit('end')
}
</script>

<style lang="scss">
.year-entry {
  width: 74px;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
}


</style>
