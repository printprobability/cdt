<template>
  <div v-if="props.characters.length > 0" class="mx-auto mx-auto" style="width: 90%">
    <div class="character-grid">
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
  // center: {type: Boolean}
});
</script>

<style scoped lang="scss">
.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 52px);
  justify-content: space-between;
  grid-gap: 20px;
}
</style>
