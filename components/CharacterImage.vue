<template>
  <NuxtLink :to="{ name: 'characters-id', params: { id: props.character.unique_id} }">
    <v-img
      cover
      width="54px"
      height="70px"
      max-width="54px"
      max-height="70px"
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
