<template>

    <div class="media-box">
        <v-lazy>
            <v-img class="page-cover" :src="page.image.thumbnail" :alt="page.label"></v-img>
        </v-lazy>
    </div>

</template>

<script setup>

    const props = defineProps({ page: Object });

</script>

<style scoped>

    .media-box {

        width: 215px;
    }

    .page-cover {

        max-height: 275px;
        max-width: 200px;
    }    
</style>
