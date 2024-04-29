<template>

    <!-- <v-alert show type="error" class="dldt-alert"> -->
    <v-alert class="dldt-alert" show>        
        {{ alertText }}
        Contact
        <a :href="`mailto:${$siteConfig.contact.email}`">
            {{ $siteConfig.contact.fullname }}
        </a>
        with any questions.
    </v-alert>

</template>

<script setup>

    import { ref } from "vue";

    const alertText = ref("This is an alpha site. Content and style are subject to change at anytime.");

</script>

<style>

.dldt-alert {

    background-color: #f8d7da !important;
    border-color: #f5c6cb !important;
    border-radius: 0 !important;
    color: #721c24 !important;
    font-family: $font-family-base;
    font-size: 1rem;
}

</style>