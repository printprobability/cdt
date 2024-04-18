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

    <!-- <VMedia :imageAlt="props.alt" :imageSrc="props.image">

        <template #content>
            <div class="ml-4">
                <NuxtLink :to="to">
                    <h2>{{ props.title }}</h2>
                </NuxtLink>
                <p class="lead">{{ props.text }}</p>
            </div>
        </template>

    </VMedia> -->

    <v-card flat>

        <div class="d-flex flex-no-wrap">

            <v-avatar class="ma-3" size="250" rounded="0">
                <v-img class="border" :alt="props.alt" :src="props.image"></v-img>
            </v-avatar>

            <div>
                <NuxtLink :to="props.to">
                    <h2 class="splashbox-title">{{ props.title }}</h2>
                </NuxtLink>
                <p class="lead">{{ props.text }}</p>
            </div>

        </div>

    </v-card>

</template>

<script setup>

    const props = defineProps({

        alt: String,
        image: String,
        text: String,
        title: String,
        to: Object
    });

    console.log(`props.to: ${JSON.stringify(props.to)}`);

</script>