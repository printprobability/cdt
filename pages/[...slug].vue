<template>
    
    <main>
        <h1>{{ page.title }}</h1>
        <ContentDoc />
    </main>

</template>

<script setup>

    const route = useRoute();

    // Data
    const { data: page } = await useAsyncData("myArticle", () => queryContent("articles", route.params.slug).find());

    // Head
    useHead({ titleTemplate: `${page.title} - %s` });

</script>
