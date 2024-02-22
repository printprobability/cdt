<template>

    <div class="media-box">
        <v-img class="page-cover" :src="page.image.thumbnail" :alt="page.label" />
    </div>

</template>
  
<script>

export default {

    props: {

        page: Object,
    },
};

</script>

<style scoped>

.media-box {
    
    width: 215px;
}

.page-cover {

    max-width: 200px;
    max-height: 275px;
}

</style>
  