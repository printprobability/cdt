<template>
  <v-app>
    <slot/>
  </v-app>
</template>

<script setup>
const {$siteConfig} = useNuxtApp();

useHead({title: `${$siteConfig.maintitle} - ${$siteConfig.subtitle}`});
</script>
