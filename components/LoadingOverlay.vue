<template>
  <v-overlay :model-value="loading" persistent class="align-center justify-center">
    <v-sheet class="background">
      <v-container>
        <v-layout>
          <v-progress-circular indeterminate size="64" color="white" />
        </v-layout>
      </v-container>
    </v-sheet>
  </v-overlay>
</template>

<script setup>
// Get state
const loading = useState("loading", () => false);
</script>

<style scoped>
.background {
  background: black;
  opacity: 0.5;
  border-radius: 10px;
}
</style>
