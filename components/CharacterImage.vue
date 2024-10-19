<template>
  <NuxtLink :to="{ name: 'characters-id', params: { id: props.character.char_id } }">
    <v-img
      width="45px"
      height="55px"
      max-width="45px"
      max-height="55px"
      class="border border-sm border-opacity-100 border-black"
      lazy-src="/img/image.jpg"
      :id="props.character.char_id"
      :alt="props.character.label"
      :src="props.character.web_url"
    />
    <!-- :src="props.character.image.webUrl" -->
  </NuxtLink>
</template>

<script setup>
import {defineProps} from "vue";

// Props
const props = defineProps({
  character: {type: Object},
});
</script>
