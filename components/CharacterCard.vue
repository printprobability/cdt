<template>

    <div>
        <p>
            <NuxtLink :to="character_link">
                <v-img class="buffer_preview" :src="character.image.buffer" />
            </NuxtLink>
        </p>
        <NuxtLink :to="character_link">See character in context</NuxtLink>
    </div>

</template>
  
<script>

export default {

    name: "CharacterCard",

    props: {

        character: Object,
    },

    computed: {

        character_link() {


            return {
                name: "characters-id",
                params: {

                    id: this.character.id,
                },
            };
        },
    }
};

</script>
  