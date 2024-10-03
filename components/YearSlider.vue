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
      @update:model-value="
        emit('update:modelValue', { yearEarly: $event[0], yearLate: $event[1] })
      "
    >
      <template #message>
        <div class="d-flex" style="width: 100%">
          <div>{{ yearRange[0] }}</div>
          <v-spacer />
          <div>{{ yearRange[1] }}</div>
        </div>
      </template>
      <template #details> </template>
    </v-range-slider>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: { type: Object },
  maxYear: { type: Number, default: 1700 },
  minYear: { type: Number, default: 1660 },
});

const emit = defineEmits(["update:modelValue", "end"]);

// Year range array
const yearRange = computed(() => [
  props.modelValue?.yearEarly,
  props.modelValue?.yearLate,
]);
</script>
