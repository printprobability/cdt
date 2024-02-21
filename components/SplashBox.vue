<template>
    <!-- <b-media>

        <template #aside>
            <v-img class="border" :src="image" :alt="alt" />
        </template>
        
        <div class="ml-4">
            <NuxtLink :to="to">
                <h2>{{ head }}</h2>
            </NuxtLink>
            <p class="lead">{{ lead }}</p>
        </div>

    </b-media> -->

    <VMedia :imageSrc="image" :imageAlt="alt">

        <template #content>
            <div class="ml-4">
                <NuxtLink :to="to">
                    <h2>{{ title }}</h2>
                </NuxtLink>
                <p class="lead">{{ text }}</p>
            </div>
        </template>

    </VMedia>

    <!-- <v-card flat>

        <div class="d-flex flex-no-wrap">

            <v-avatar class="ma-3" size="125" rounded="0">
                <img class="border" :src="image" />
            </v-avatar>

            <div>
                <h2 class="splashbox-title">{{ title }}</h2>
                <p class="lead">{{ text }}</p>
            </div>

        </div>

    </v-card> -->

</template>

<script>

export default {

    props: {

        image: String,
        alt: String,
        to: Object,
        title: String,
        text: String,
    }
};
</script>