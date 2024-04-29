<template>
    <v-btn color="#808080" :href="href">Download JSON</v-btn>
</template>

<script setup>

    defineProps({ href: String });

</script>
