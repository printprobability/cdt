<template lang="">
  <div class="d-flex align-center ga-2">
    <span>{{ props.label }}</span>
    <v-text-field
      :model-value="props.modelValue"
      hide-details
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </div>
</template>
<script setup>
import { defineProps, defineEmits, reactive, watch } from "vue";

const props = defineProps({
  modelValue: { type: String },
  label: { type: String },
});

const emit = defineEmits(["update:modelValue"]);
</script>
