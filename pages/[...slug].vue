<template>
  <v-layout>
    <v-main class="d-flex flex-column align-center justify-center">
      <h1 class="font-medium mb-5">404</h1>
      <p class="font-light mb-10">Page not found</p>
      <v-btn variant="outlined" color="red-darken-3" :to="{name: 'index'}">Go back home</v-btn>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'empty'
})
</script>

<style lang="scss" scoped>
.font-medium {
  font-weight: 500;
  font-size: 6rem;
  line-height: 1;
}

.font-light {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
</style>
