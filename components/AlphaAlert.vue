<template>

    <v-alert show type="error" class="dldt-alert">
        {{ alertText }}
        Contact
        <a :href="`mailto:${$siteConfig.contact.email}`">
            {{ $siteConfig.contact.fullname }}
        </a>
        with any questions.
    </v-alert>

</template>

<script>

    export default {

        data() {

            return {

                alertText: "This is an alpha site. Content and style are subject to change at anytime.",
            }
        }

    };

</script>