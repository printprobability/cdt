<template>

    <article>
        <h1>{{ page.title }}</h1>
        <nuxt-content :document="page" />
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

        const page = await $content("articles", params.slug).fetch();

        return { page };
    }
};

</script>
  