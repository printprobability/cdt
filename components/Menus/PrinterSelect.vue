<template>
  <div class="d-flex align-center ga-2">
    <v-autocomplete
      v-model="model"
      v-model:search="search"
      clearable
      messages="Filter characters by printer"
      variant="outlined"
      :label
      :items="printers"
      :custom-filter="filter"
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
    </v-autocomplete>
  </div>
</template>

<script setup lang="ts">
import {useVModel} from "@vueuse/core";
import _ from "lodash";
import {defineProps, defineEmits, ref, computed, nextTick, watch} from "vue";
import Fuse from 'fuse.js'
import {useAriaLabelForRole} from "~/composables/useAriaLabelForRole";

// Props
const props = defineProps({
  modelValue: {type: String},
});

// Emits
const emit = defineEmits(["update:modelValue", "end"]);

// Get resources
const {$axios} = useNuxtApp();

// Model
const model = useVModel(props, "modelValue", emit);
// Emit end event
watch(model, () => emit("end"));

// Label
const label = ref('Printer')
useAriaLabelForRole(label)

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
const {data: fetchedData} = await useAsyncData("fetchPrinterLabels", async () => (await $axios.get("/printers")).data);
// Get character classes object
const printers = computed(() => fetchedData.value?.results ?? []);

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
      $axios.request({url: fetchedData.value.next}).then((res) => {
        // Merge new data into current data
        mergeData(res.data);
        // Mark as not fetching
        nextTick(() => (isFetching.value = false));
      });
    }
  }
};
// Merge data
const mergeData = (data) => (fetchedData.value = {...data, results: _.concat(fetchedData.value.results, data.results)});

// ********************************
// Filter
// ********************************

// Fuse instance
let fuse: Fuse<string> | null = null
// Only init Fuse if data is not empty
whenever(printers, value => fuse = new Fuse(value, {
  shouldSort: false,
  findAllMatches: true,
  ignoreLocation: true,
  threshold: 0.3
}), {immediate: true})

// Matched printer
const matchedPrinter = ref([])

// Search text
const search = ref('')
// watch for search text change, if truthy, execute fuzzy search to find matchedPrinter. Else, clear it
watch(search, value => matchedPrinter.value = value ? fuse?.search(value).map(matched => matched.item) : [...printers.value])

// Filter function for autocomplete
const filter = (itemTitle) => matchedPrinter.value.length > 0 && matchedPrinter.value.indexOf(itemTitle) > -1
</script>
