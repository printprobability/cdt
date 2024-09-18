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
        {{ props.character.label }}
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
    <!--      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus!-->
    <!--      Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!-->

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

    <template v-if="!props.short">
      <v-skeleton-loader
        :loading="props.loading"
        class="flex-grow-1"
        type="text"
        style="margin: 0 !important;"
      >
        <v-card-text class="d-flex pt-0">
          Character Coordinate:
          x: {{ props.character.absolute_coords.x }};
          y: {{ props.character.absolute_coords.y }};
          w: {{ props.character.absolute_coords.w }};
          h: {{ props.character.absolute_coords.h }};
        </v-card-text>
      </v-skeleton-loader>

      <v-skeleton-loader
        :loading="props.loading"
        class="flex-grow-1"
        type="text"
        style="margin: 0 !important;"
      >
        <v-card-text class="d-flex pt-0">
          Cite As: {{ props.character.line.label }}
        </v-card-text>
      </v-skeleton-loader>
    </template>
  </v-card>
</template>

<script setup>
import {defineProps} from "vue";

const props = defineProps({
  character: {type: Object},
  loading: {type: Boolean},
  width: {type: String},
  short: {type: Boolean}
});
</script>
