<template>
  <v-container>
    <div class="d-flex">
      <p v-if="props.title" class="page-title">{{ props.title }}</p>
      <v-spacer/>
      <slot name="left"></slot>
    </div>

    <slot name="intro"></slot>

    <v-row class="mt-5">
      <v-col cols="12" md="3">
        <p class="page-header">Search the Catalog</p>
        <v-form>
          <slot name="filter"></slot>
        </v-form>
<!--        <div v-if="$vuetify.display.mdAndUp" style="height: calc(15vh - 20px)"/>-->
      </v-col>

      <v-col cols="12" md="9">
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
  empty: Boolean,
});
</script>

<style>
.page-header {
  font-size: 1em;
  font-weight: 600;
  //color: #b00;
}

.page-title {
  font-size: 2.5em;
  font-weight: 500;
  //color: #b00;
}
</style>
