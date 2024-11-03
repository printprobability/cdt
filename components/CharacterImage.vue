<template>
  <NuxtLink
    :to="{ name: 'characters-id', params: {id: props.character.unique_id} }"
    :aria-label="`To detail page of ${props.character.unique_id}`"
  >
    <v-img
      cover
      width="52px"
      height="68px"
      max-width="52px"
      max-height="68px"
      class="border border-sm border-opacity-100 border-black"
      lazy-src="/img/image.jpg"
      :id="props.character.char_id"
      :alt="`Thumbnail of ${props.character.unique_id}`"
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
