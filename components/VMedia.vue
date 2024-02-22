<template>

    <v-card flat>

        <div class="d-flex flex-no-wrap">

            <slot name="image">
                <v-avatar class="ma-3" size="125" rounded="0">
                    <img class="border" :src="imageSrc" :alt="imageAlt" />
                </v-avatar>
            </slot>

            <slot name="content"></slot>

        </div>

    </v-card>

</template>

<script>

export default {

    props: {

        imageAlt: String,
        imageSrc: String
    }
};

</script>