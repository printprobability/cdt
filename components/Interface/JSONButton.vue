<template>
    <v-button :href="href">
        <v-icon icon="code-slash" aria-hidden="true" class="mr-2" />Download JSON
    </v-button>
</template>

<script setup>

defineProps({ href: String });

</script>
