<template>

  <v-container>

    <p class="page-title">{{ props.title }}</p>

    <slot name="intro"></slot>

    <hr/>

    <v-row>

      <v-col cols="3">
        <p class="page-header">Filter</p>
        <v-form>
          <slot name="filter"></slot>
        </v-form>
      </v-col>

      <v-col cols="9">
        <p v-if="empty" class="page-header">No results</p>

        <slot name="results"></slot>
      </v-col>
    </v-row>

    <slot name="foot"></slot>

  </v-container>
</template>

<script setup>
const props = defineProps({
  title: String,
  empty: Boolean
});
</script>

<style>

.page-header {

  font-family: "Vollkorn";
  font-size: 1.5em;
  font-weight: 600;
  color: #b00;
}

.page-title {

  font-family: "Cinzel";
  font-size: 2.5em;
  font-weight: 500;
  color: #b00;
}

</style>
