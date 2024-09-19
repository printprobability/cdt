<template>
  <NuxtLink :to="{ name: 'characters-id', params: { id: props.character.id } }">
    <v-img
      :id="props.character.id"
      :alt="props.character.label"
      width="45px"
      height="55px"
      max-width="45px"
      max-height="55px"
      class="border border-sm border-opacity-100 border-black"
      lazy-src="/img/image.jpg"
      src="https://printprobdb.psc.edu/iiif//books/redo/twarreniii_R38820_uk_8_acollectionofpoemsbyseveralREDO1693/pages_color/twarreniii_R38820_uk_8_acollectionofpoemsbyseveralREDO1693-0034.tif/35,1735,40,53/full/0/default.jpg"
    />
    <!-- :src="props.character.image.webUrl" -->
  </NuxtLink>
</template>

<script setup>
import { defineProps } from "vue";

// Props
const props = defineProps({
  character: { type: Object },
});
</script>
