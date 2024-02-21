<template>

    <v-container>

        <h3>
            <NuxtLink :to="grouping_link">
                {{ grouping.label }}
            </NuxtLink>
        </h3>

        <div class="d-flex flex-wrap">

            <CharacterImage v-for="character in characters" :key="character.id" :character="character"
                :selected="is_selected_character(character.id)" />

            <NuxtLink :to="grouping_link">
                <span v-if="n_chars > 10"> {{ n_chars - 10 }} more characters... </span>
            </NuxtLink>
        </div>

    </v-container>

</template>
  
<script>

export default {

    props: {

        grouping: Object,
        selected_character_id: String
    },

    data() {

        return {

            characters: [],
        };
    },

    async fetch() {

        this.characters = await this.$content("characters")
            .where({ id: { $in: this.grouping.characters } })
            .sortBy("characterClass")
            .only(["id", "image", "label"])
            // .limit(10)
            .fetch();
    },

    methods: {

        is_selected_character(char_id) {

            return char_id == this.selected_character_id;
        },
    },
    computed: {

        grouping_link() {

            return { name: "groupings-id", params: { id: this.grouping.id } };
        },        

        n_chars() {

            return this.grouping.characters.length;
        }
    }
};
</script>
  