<template>
  <div v-if="props.characters.length > 0">
    <v-table>
      <thead>
        <tr>
          <th class="text-center">Type Sort</th>
          <th class="text-center">Character Name</th>
          <th class="text-center">Printer</th>
          <th class="text-center">Date</th>
          <th class="text-center">Source Book</th>
          <th class="text-center">UniqueID</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(character, i) in characterDetails"
          :key="character?.id ?? i"
          class="py-2"
        >
          <template v-if="character">
            <td><CharacterImage :character="character" /></td>
            <td>{{ character.character_class }}</td>
            <td>
              <NuxtLink :to="`/printer/${character.book.pp_printer}`">
                {{ character.book.pp_printer }}
              </NuxtLink>
            </td>
            <td>{{ character.book.pq_year_early }}</td>
            <td>
              <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                  <div v-bind="props">
                    {{ character.book.estc || "ESTC Placeholder" }}
                  </div>
                </template>

                <div>Book info</div>
              </v-tooltip>
            </td>
            <td>
              <NuxtLink :to="{ name: 'characters' }">
                {{ character.book.id }}
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
import { useNuxtApp } from "nuxt/app";
import { defineProps, watch } from "vue";

// Resources
const { $axios } = useNuxtApp();

// Props
const props = defineProps({
  characters: { type: Array, default: () => [] },
});

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
    () =>
      $axios
        .get(`/characters/${character.id}`)
        .then((res) => (characterDetails.value[index] = res.data))
        .catch((err) => {
          // Maybe server is overloaded ?
          if (retry && err.response.status === 503) {
            fetchDetail(character, index, false, 500);
          }
        }),
    delay
  );

// Watch for characters changes
watch(() => props.characters, fetchDetails);

// Fetch details on mounted
onMounted(() => fetchDetails(props.characters));
</script>
