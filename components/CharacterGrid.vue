<template>
  <div v-if="props.characters.length > 0">
    <div :class="classObj">
      <CharacterHoverableImage
        v-for="character of props.characters"
        :key="character.char_id"
        :character="character"
      />
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

// Props
const props = defineProps({
  characters: {type: Array, default: () => []},
  center: {type: Boolean}
});

// Class object
const classObj = computed(() => ({
  'd-flex': true,
  'flex-wrap': true,
  'ga-5': true,
  'px-10': true,
  'justify-center': props.center
}))
</script>
