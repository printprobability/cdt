<template>
  <InterfaceList v-model="page" :empty="characters.length === 0">
    <template #intro>
      <!-- <p>{{ $siteConfig.browsecopy.characters }}</p> -->
      <div style="font-size: 18px; font-weight: bold">{{ title }}</div>
      <p class="mt-2">{{ intro }}</p>
    </template>

    <template #left>
      <v-btn-toggle
        v-model="mode"
        color="red-darken-3"
        mandatory
        variant="outlined"
      >
        <v-btn icon="mdi-view-grid" value="grid" />
        <v-btn icon="mdi-table" value="table" />
      </v-btn-toggle>
    </template>

    <template #filter>
      <TextField v-model="printer" label="Printer (Last name)" @end="filter" />
      <YearSlider
        v-model="yearRange"
        :min-year="MIN_YEAR"
        :max-year="MAX_YEAR"
        class="mt-3"
        @end="filter"
      />
      <MenusCharacterClassSelect
        v-model="characterClass"
        class="mt-3"
        @end="filter"
      />
    </template>

    <template #results>
      <CharacterGrid v-if="mode === 'grid'" :characters />
      <CharacterTable v-else-if="mode === 'table'" :characters />

      <div v-if="pageNums > 0">
        <v-pagination
          :length="pageNums"
          v-model="page"
          @update:model-value="onChangePage"
        />
        <div class="text-center">
          {{ minItemText }}-{{ maxItemText }} of {{ count }}
        </div>
      </div>
    </template>
  </InterfaceList>
</template>

<script setup>
import { useAsyncData } from "nuxt/app";
import { ref, watch, computed, nextTick } from "vue";

// Resources
const { $axios, $loader } = useNuxtApp();
// Get route
const route = useRoute();

// ********************************
// Config
// ********************************
const MIN_YEAR = 1660;
const MAX_YEAR = 1700;
// Title
const title = ref(
  `Catalog & Distinctive Types, Restoration England (${MIN_YEAR}-${MAX_YEAR})`
);
// Intro
const intro = ref(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
);

// Head
useHead({ titleTemplate: title.value });

// ********************************
// View mode
// ********************************
// Mode
const mode = ref("grid");
// Change itemsPerPage when changing mode
watch(mode, (value) => {
  // Update items
  itemsPerPage.value = value === "grid" ? 50 : 10;
  // Clear data
  characters.value = [];
  // Fetch at nextTick
  nextTick(filter);
});

// ********************************
// Pagination
// ********************************
// Page
const page = ref(1);
// Number of pages
const pageNums = computed(() => Math.ceil(count.value / itemsPerPage.value));
// Page offset
const pageOffset = computed(() => (page.value - 1) * itemsPerPage.value);

// Items per page
const itemsPerPage = ref(50);
// Min item text
const minItemText = computed(() => pageOffset.value + 1);
// Max item text
const maxItemText = computed(() =>
  Math.min(pageOffset.value + itemsPerPage.value, count.value)
);

// Mark that user change page
const isPageChanged = ref(false);
// On change page handler
const onChangePage = () => {
  // Change flag
  isPageChanged.value = true;
};
// Reset page
const resetPage = () => {
  // If this fetching process is not caused by changing page, reset page to 1
  if (!isPageChanged.value) page.value = 1;
  // Reset flag
  isPageChanged.value = false;
};

// ********************************
// Filter
// ********************************
// Printer
const printer = ref("");
// Year range
const yearRange = ref({ yearEarly: MIN_YEAR, yearLate: MAX_YEAR });
// Character class
const characterClass = ref(null);

// Filter query
const filterQuery = computed(() => {
  // Query
  const query = {
    limit: itemsPerPage.value,
    offset: itemsPerPage.value * (page.value - 1),
    pq_year_early: yearRange.value.yearEarly,
    pq_year_late: yearRange.value.yearLate,
  };

  if (printer.value) query["printer_like"] = printer.value;
  if (characterClass.value) query["character_class"] = characterClass.value;
  if (route.query.book) query["book"] = route.query.book;

  return query;
});
// Filter API
const filterAPI = () =>
  $axios.get("/characters/", { params: filterQuery.value });
// Filter
const filter = () => {
  // Open loading overlay
  $loader.load();
  // Call API
  filterAPI()
    .then((res) => {
      // Get fetched data
      characters.value = res.data.results;
      // Save count
      count.value = res.data.count;
      // Reset page
      resetPage();
    })
    .finally($loader.finish);
};

// Fetch data on page changes
watch(page, filter);

// ********************************
// Characters
// ********************************
// Fetch characters
const { data } = await useAsyncData(
  "fetchCharacters",
  async () => (await filterAPI()).data
);
// Characters
const characters = ref(data.value?.results ?? []);
// Total count
const count = ref(data.value?.count ?? 0);
const testing = ref([]);
</script>
