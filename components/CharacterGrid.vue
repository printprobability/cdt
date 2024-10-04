<template>
  <div v-if="props.characters.length > 0">
    <div :class="classObj">
      <CharacterHoverableImage v-for="(_, i) in props.characters" :key="props.characters[i].id" :character="props.characters[i]"/>
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
