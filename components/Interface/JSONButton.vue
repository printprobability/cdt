<template>
    <v-btn :href="href">Download JSON</v-btn>
</template>

<script setup>

    defineProps({ href: String });

</script>
