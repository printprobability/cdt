<template>
  <div class="d-flex align-center ga-2">
    <v-range-slider
      :model-value="yearRange"
      :min="props.minYear"
      :max="props.maxYear"
      label="Year"
      strict
      thumb-label
      hide-details
      persistent-hint
      @mouseup="emit('end')"
      @update:model-value="
        emit('update:modelValue', { yearEarly: $event[0], yearLate: $event[1] })
      "
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watch } from "vue";

const props = defineProps({
  modelValue: { type: Object },
  maxYear: { type: Number, default: 1800 },
  minYear: { type: Number, default: 1600 },
});

const emit = defineEmits(["update:modelValue", "end"]);

// Year range array
const yearRange = computed(() => [
  props.modelValue?.yearEarly,
  props.modelValue?.yearLate,
]);
</script>
