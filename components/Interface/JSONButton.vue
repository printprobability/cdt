<template>

    <b-button :href="href">
        <b-icon icon="code-slash" aria-hidden="true" class="mr-2" />
        {{ buttonText }}
    </b-button>

</template>
  
<script>
export default {

    name: "InterfaceJSONButton",

    props: {

        href: String,
    },

    data() {

        return {

            buttonText: "Download JSON"
        };
    }
};
</script>Ï