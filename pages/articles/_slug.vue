<template>

    <article>
        <h1>{{ page.title }}</h1>
        <NuxtContent :document="page" />
    </article>

</template>
  
<script>

export default {

    head() {

        return {

            titleTemplate: `${this.page.title} - %s`,
        };
    },
    
    async asyncData({ $content, params }) {

        // const page = await $content("articles", params.slug).fetch();
        const page = await useFetch(() => queryContent("articles", params.slug));

        return { page };
    }
};

</script>

<script setup>

</script>