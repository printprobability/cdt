<template>
  <div class="d-flex align-center ga-2">
    <v-select
      v-model="model"
      label="Character/Letterform"
      variant="outlined"
      hide-details
      item-title="classname"
      item-value="classname"
      :items="characterClasses"
    >
      <template #append-item>
        <v-list-item v-if="hasNextPage" class="text-center">
          <v-progress-circular
            v-intersect="fetchNextPage"
            indeterminate
            color="red-darken-3"
            class="justify-center"
          />
        </v-list-item>
      </template>
    </v-select>
  </div>
</template>

<script setup>
import { useVModel } from "@vueuse/core";
import _ from "lodash";
import { defineProps, defineEmits, ref, computed, nextTick, watch } from "vue";

// Props
const props = defineProps({
  modelValue: { type: String },
});

// Emits
const emit = defineEmits(["update:modelValue", "end"]);

// Get resources
const { $axios } = useNuxtApp();

// Model
const model = useVModel(props, "modelValue", emit);
// Emit end event
watch(model, () => emit("end"));

// ********************************
// Menu status
// ********************************
// Does data has next page
const hasNextPage = computed(
  () => !!(fetchedData.value && fetchedData.value.next)
);

// ********************************
// Data fetch from API
// ********************************
// Fetch data
const { data: fetchedData } = await useAsyncData(
  "fetchCharacterClasses",
  async () => (await $axios.get("/character_classes")).data
);
// Get character classes object
const characterClasses = computed(() => fetchedData.value?.results ?? []);

// ********************************
// Fetching next page
// ********************************
// Check if fetching
const isFetching = ref(false);
// Fetch next page when scrolling to the end
const fetchNextPage = (isIntersecting, entries, observer) => {
  // Only fetch when not fetching and loading indicator is intersected
  if (!isFetching.value && isIntersecting) {
    // Check if having next page
    if (fetchedData.value.next) {
      // Mark as fetching
      isFetching.value = true;
      // Call API
      $axios.request({ url: fetchedData.value.next }).then((res) => {
        // Merge new data into current data
        mergeData(res.data);
        // Mark as not fetching
        nextTick(() => (isFetching.value = false));
      });
    }
  }
};
// Merge data
const mergeData = (data) =>
  (fetchedData.value = {
    ...data,
    results: _.concat(fetchedData.value.results, data.results),
  });
</script>
