<template>
  <v-menu
    open-on-hover
    location="bottom center"
    :open-on-click="false"
    :open-on-focus="false"
    @update:modelValue="$event && fetchCharacter()"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <div class="m-1">
        <NuxtLink v-bind="activatorProps" :to="{ name: 'characters-id', params: { id: props.character.id } }">
          <v-img

            :id="props.character.id"
            :alt="props.character.label"
            max-height="55px"
            max-width="45px"
            width="45px"
            class="border border-sm border-opacity-100 border-black"
            src="https://printprobdb.psc.edu/iiif//books/redo/twarreniii_R38820_uk_8_acollectionofpoemsbyseveralREDO1693/pages_color/twarreniii_R38820_uk_8_acollectionofpoemsbyseveralREDO1693-0034.tif/35,1735,40,53/full/0/default.jpg"
          />
          <!-- :src="props.character.image.webUrl" -->
        </NuxtLink>
      </div>
    </template>

    <CharacterCard :character="cachedCharacter" width="200" short :loading/>
  </v-menu>
</template>

<script setup>
import {defineProps, ref} from "vue";

// Resources
const {$axios} = useNuxtApp();

// Props
const props = defineProps({
  character: {type: Object},
  caching: {type: Boolean}
});

// Loading flag
const loading = ref(false)

// Cached character
const cachedCharacter = ref(null)
// Fetch character and cache if needed
const fetchCharacter = () => {
  // Check if cache is enable and character is cached
  if (props.caching && cachedCharacter.value) return

  // Update flag
  loading.value = true
  // Fetch character by id
  $axios.get(`/characters/${props.character.id}`).then(res => {
    // Save data
    cachedCharacter.value = res.data
    // Update flag
    loading.value = false
  })
}
</script>
