<template>
  <v-menu
    open-on-hover
    location="bottom center"
    :open-on-click="false"
    :open-on-focus="false"
    @update:modelValue="$event && fetchCharacter()"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <div v-bind="activatorProps" class="m-1">
        <CharacterImage :character="props.character"/>
      </div>
    </template>

    <CharacterCard :character="cachedCharacter" width="200" :loading/>
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
