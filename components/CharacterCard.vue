<template>
  <v-card
    class="mx-auto"
    width="200"
  >
    <v-skeleton-loader
      :loading="props.loading"
      class="flex-grow-1 ma-0"
      type="text"
      style="margin: 0 !important;"
    >
      <v-card-text class="font-weight-black">
        {{ props?.character?.book?.label }}
      </v-card-text>
    </v-skeleton-loader>

    <v-skeleton-loader
      :loading="props.loading"
      class="flex-grow-1"
      type="text"
      style="margin: 0 !important;"
    >
      <v-card-text class="d-flex pt-0">
        Date: {{ props.character.book.pq_year_early }}
      </v-card-text>
    </v-skeleton-loader>

    <v-skeleton-loader
      :loading="props.loading"
      class="flex-grow-1"
      type="text"
      style="margin: 0 !important;"
    >
      <v-card-text class="d-flex pt-0">
        Printer: {{ props.character.book.pp_printer }}
      </v-card-text>
    </v-skeleton-loader>

    <v-skeleton-loader
      :loading="props.loading"
      class="flex-grow-1"
      type="text"
      style="margin: 0 !important;"
    >
      <v-card-text class="d-flex pt-0">
        Source Book: {{ props.character.book.estc }}
      </v-card-text>
    </v-skeleton-loader>
  </v-card>
</template>

<script setup>
import {defineProps} from "vue";

const props = defineProps({
  character: {type: Object},
  loading: {type: Boolean},
  width: {type: String},
});
</script>
