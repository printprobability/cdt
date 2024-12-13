<template>
  <v-container>
    <h1 style="display: none">Printer list</h1>
    <!-- <p>{{ $siteConfig.browsecopy.characters }}</p> -->
    <div class="header-font" style="font-size: 18px; font-weight: bold">{{ title }}</div>
    <p class="mt-2">{{ intro }}</p>

    <v-list class="printer-grid mt-5">
      <v-list-item
        v-for="(printer, i) in printers"
        rounded="lg"
        variant="outlined"
        :key="i"
        :active="false"
        :value="printer['printer_string']"
        :to="{name: 'index', query: {pq_year_early: printer['pq_year_early'], pq_year_late: printer['pq_year_late'], printer_like: printer['printer_string']}}"
        @click="clearNuxtState((key) => key.startsWith('chars'))"
      >
        <v-list-item-title
          class="text-center"
          v-text="printer['printer_string']"
          :aria-label="`Characters of ${printer['printer_string']}`"
        />
      </v-list-item>
    </v-list>

  </v-container>
</template>

<script setup>
import {ref} from "vue";
import {useAsyncData} from "nuxt/app";

// Resources
const {$axios, $loader} = useNuxtApp();

// Title
const title = ref(`INDEX of PRINTERS in CATALOG OF DISTINCTIVE TYPE, Restoration England (1650-1710)`);
// Intro
const intro = ref(
  "The CDT includes a curated subset of damaged and distinctive type used by the following printers in Restoration England (1650-1710). Note that some printers worked exclusively in collaboration with a second printer. The respective types of these printers — if they had separate type cases or print shops at all — are impossible to reliably assign or differentiate. In these cases, the names of both collaborators are given as a single entry in the CDT."
);

// Fetch data
const {data: printers} = await useAsyncData("fetchPrinters", async () => (await $axios.get("/printers")).data.results);

// Head
useHead({titleTemplate: title.value});
</script>

<style lang="scss" scoped>
.printer-grid {
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: space-between;
  grid-gap: 10px;
}

@media (max-width: 600px) {
  .printer-grid {
    grid-template-columns: repeat(2, auto);
  }
}
</style>
