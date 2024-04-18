<template>

    <v-card flat>

        <p v-if="props.title">{{ props.title }}</p>

        <div class="d-flex flex-no-wrap">

            <slot name="image">
                <v-avatar class="ma-3" size="125" rounded="0">
                    <v-img class="border" :src="imageSrc" :alt="imageAlt"></v-img>
                </v-avatar>
            </slot>

            <slot name="content"></slot>

        </div>

    </v-card>

</template>

<script setup>

const props = defineProps({

    imageAlt: String,
    imageSrc: String,
    title: String
});

</script>