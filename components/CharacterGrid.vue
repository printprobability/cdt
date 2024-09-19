<template>
  <div v-if="props.characters.length > 0">
    <div class="d-flex flex-wrap ga-5 px-10">
      <CharacterHoverableImage v-for="(_, i) in props.characters" :key="props.characters[i].id" :character="props.characters[i]"/>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

// Props
const props = defineProps({
  characters: {type: Array, default: () => []},
});
</script>
