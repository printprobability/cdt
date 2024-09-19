<template>
  <InterfaceList
    v-model="page"
    title="Browse Characters"
    :empty="characters.length === 0"
  >
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
        :min="MIN_YEAR"
        :max="MAX_YEAR"
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

      <div v-if="pageNums > 0" class="d-flex justify-center align-center">
        <span class="d-flex">
          {{ pageOffset + 1 }}-{{ pageOffset + itemsPerPage }} of {{ count }}
        </span>
        <v-pagination :length="pageNums" v-model="page" class="ml-2" />
      </div>
    </template>
  </InterfaceList>
</template>

<script setup>
import { reactive, ref, watch, computed, nextTick } from "vue";

// Head
useHead({ titleTemplate: "Character Search - %s" });
// Resources
const { $axios, $loader } = useNuxtApp();
// Get route
const route = useRoute();

// ********************************
// Config
// ********************************
const MIN_YEAR = 1600;
const MAX_YEAR = 1800;
// Title
const title = ref(
  "Catalog & Distinctive Types, Restoration England (1640-1700)"
);
// Intro
const intro = ref(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
);

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

// Page
const page = ref(1);
// Number of pages
const pageNums = computed(() => Math.ceil(count.value / itemsPerPage.value));
// Page offset
const pageOffset = computed(() => (page.value - 1) * 10)

// Items per page
const itemsPerPage = ref(50);

// ********************************
// Filter
// ********************************
// Printer
const printer = ref("");
// Year range
const yearRange = ref({ yearEarly: MIN_YEAR, yearLate: MAX_YEAR });
// Character class
const characterClass = ref("");

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
// Filter
const filter = () => {
  // Open loading overlay
  $loader.load();
  // Call API
  $axios.get("/characters/", { params: filterQuery.value })
  .then((res) => {
    // Get fetched data
    characters.value = res.data.results;
    // Save count
    count.value = res.data.count;
  })
  .finally($loader.finish);
};

// Fetch data on page changes
watch(page, filter);

// ********************************
// Characters
// ********************************
// Characters
const characters = ref([]);
// Total count
const count = ref([]);
// Fetch on mounted
onMounted(filter);
</script>
