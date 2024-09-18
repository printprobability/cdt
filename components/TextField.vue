<template>
  <div class="d-flex align-center ga-2">
    <v-text-field
      :model-value="props.modelValue"
      :label="props.label"
      hide-details
      variant="outlined"
      @update:modelValue="$emit('update:modelValue', $event)"
      @update:focused="$event || $emit('blur')"
    />
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: { type: String },
  label: { type: String },
});

const emit = defineEmits(["update:modelValue", "blur"]);
</script>
