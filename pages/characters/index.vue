<template>
  <InterfaceList
    v-model="page"
    title="Browse Characters"
    :empty="characters.length === 0"
  >
    <template #intro>
      <p>{{ $siteConfig.browsecopy.characters }}</p>
    </template>

    <template #filter>
      <client-only>
        <TextField label="Printer (Last name)" @blur="filter"/>
        <YearSlider
          v-model="yearRange"
          :min="MIN_YEAR"
          :max="MAX_YEAR"
          class="mt-3"
          @blur="filter"
        />
        <MenusCharacterClassSelect v-model="characterClass" class="mt-3" @blur="filter"/>
      </client-only>
      <v-divider/>
    </template>

    <template #results>
      <CharacterGrid :characters/>

      <v-pagination v-if="pageNums > 0" :length="pageNums" v-model="page"></v-pagination>
    </template>
  </InterfaceList>
</template>

<script setup>
import {reactive, ref, watch} from "vue";

// Head
useHead({titleTemplate: "Character Search - %s"});
// Resources
const {$axios} = useNuxtApp();

// ********************************
// Config
// ********************************
const MIN_YEAR = 1600;
const MAX_YEAR = 1800;

// ********************************
// View mode
// ********************************
// Mode
const mode = ref('grid');

// Page
const page = ref(1);
// Number of pages
const pageNums = ref(0);

// Items per page
const itemsPerPage = ref(50);

// ********************************
// Filter
// ********************************
// Printer
const printer = ref('');
// Year range
const yearRange = ref({yearEarly: MIN_YEAR, yearLate: MAX_YEAR});
// Character class
const characterClass = ref('');

// Filter query
const filterQuery = computed(() => {
  // Query
  const query = {
    limit: itemsPerPage.value,
    offset: itemsPerPage.value * (page.value - 1),
    pq_year_early: yearRange.value.yearEarly,
    pq_year_late: yearRange.value.yearLate,
  }

  if (printer.value) query['printer_like'] = printer.value;
  if (characterClass.value) query['character_class'] = characterClass.value;

  return query
})
// Filter
const filter = () => $axios.get('/characters/', {params: filterQuery.value}).then(res => {
  // Get fetched data
  characters.value = res.data.results
  // Calculate number of pages
  pageNums.value = Math.ceil(res.data.count / itemsPerPage.value)
})
// Fetch data on page changes
watch(page, filter)

// ********************************
// Characters
// ********************************
// Characters
const characters = ref([])
</script>
