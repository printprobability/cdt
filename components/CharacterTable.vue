<template>
  <div v-if="props.characters.length > 0">
    <v-table class="character-table">
      <thead>
      <tr>
        <th class="text-center">Type Sort</th>
        <th class="text-center">Character Name</th>
        <th class="text-center">Printer</th>
        <th class="text-center">
          <v-btn
            :ripple="false"
            :append-icon="sortIcon"
            variant="plain"
            class="text-none opacity-100"
            @click="toggleDateSortMode"
          >
            Date
          </v-btn>
        </th>
        <th class="text-center">Source Book</th>
        <th class="text-center">UniqueID</th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="(character, i) in characterDetails"
        :key="character?.char_id ?? i"
        class="py-2"
      >
        <template v-if="character">
          <td class="py-2" aria-label="Character thumbnail">
            <CharacterImage :character="character"/>
          </td>
          <td>{{ character.character_class }}</td>
          <td aria-label="Printer">
            <NuxtLink
              :to="{ name: 'index', query: { pq_year_early: 1644, pq_year_late: 1715, printer_like: character.group_label } }"
              :aria-label="character.group_label"
            >
              {{ character.group_label }}
            </NuxtLink>
          </td>
          <td aria-label="Publish year">{{ character.book.pq_year_early }}</td>
          <td aria-label="ESTC">
            <v-tooltip location="bottom">
              <template v-slot:activator="{ props }">
                <div v-bind="props">
                  ESTC {{ character.book.estc }}
                </div>
              </template>

              <div>Book info</div>
            </v-tooltip>
          </td>
          <td aria-label="Character Unique ID">
            <NuxtLink
              :to="{ name: 'characters-id', params: { id: character.unique_id } }"
              :aria-label="character.unique_id"
            >
              {{ character.unique_id }}
            </NuxtLink>
          </td>
        </template>
        <template v-else>
          <td colspan="6" class="text-center">
            <v-progress-circular
              indeterminate
              color="red-darken-3"
              class="justify-center"
            />
          </td>
        </template>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import {useNuxtApp} from "nuxt/app";
import {defineProps, watch, computed} from "vue";

// Resources
const {$axios} = useNuxtApp();
// Get route
const route = useRoute();

// Props
const props = defineProps({
  characters: {type: Array, default: () => []},
});

// Sort by
const sortBy = useState('charsSortBy', () => route.query.sort_by ? (route.query.sort_by === 'date_desc' ? 'date_desc' : 'date_asc') : null);
// Sort icon
const sortIcon = computed(() => sortBy.value ? (sortBy.value === 'date_asc' ? 'mdi-arrow-up' : 'mdi-arrow-down') : null);
// Change sort mode
const toggleDateSortMode = () => {
  if (sortBy.value === null) sortBy.value = 'date_asc'
  else if (sortBy.value === 'date_asc') sortBy.value = 'date_desc'
  else sortBy.value = null
};

// List of character detail
const characterDetails = ref(new Array(props.characters.length));
// Logic for fetching detail of characters
const fetchDetails = (characters) => {
  // Clear data
  characterDetails.value = new Array(props.characters.length);
  // Fetch details
  characters.forEach(fetchDetail);
};
// Logic for fetching single detail
const fetchDetail = (character, index, retry = true, delay = 0) =>
  setTimeout(
    () => {
      //$axios
      //  .get(`/characters/${character.id}`)
      //  .then((res) => (characterDetails.value[index] = res.data))
      //  .catch((err) => {
      //    // Maybe server is overloaded ?
      //    if (retry && err.response.status === 503) {
      //      fetchDetail(character, index, false, 500);
      //    }
      //  }),
      characterDetails.value[index] = character
    },
    delay
  );

// Watch for characters changes
watch(() => props.characters, fetchDetails);

// Fetch details on mounted
onMounted(() => fetchDetails(props.characters));
</script>
<style scoped lang="scss">
.character-table {
  & td {
    text-align: center;

    & a {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
