<template>
  <v-container>
    <div class="d-flex">
      <p v-if="props.title" class="page-title">{{ props.title }}</p>
      <v-spacer />
      <slot name="left"></slot>
    </div>

    <slot name="intro"></slot>

    <v-row class="mt-5">
      <v-col cols="12" md="3">
        <p class="page-header">Search the Catalog</p>
        <v-form>
          <slot name="filter"></slot>
        </v-form>
        <div style="height: 15vh" />
        <div>
          <img alt="Logo" src="/img/pnp_logo.png" style="height: 40px" />
          <h6>Print & Probability</h6>
          <br />
          <h6 style="font-size: 14px; font-weight: bolder">
            About the project
          </h6>
          <br />
          <p>
            {{ about }}
          </p>
        </div>
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

// About project
const about = ref(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
);
</script>

<style>
.page-header {
  font-family: "Source Serif 4";
  font-size: 1em;
  font-weight: 600;
  color: #b00;
}

.page-title {
  font-family: "Open Sans";
  font-size: 2.5em;
  font-weight: 500;
  color: #b00;
}
</style>
