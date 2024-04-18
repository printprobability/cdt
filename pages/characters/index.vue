<template>

    <InterfaceList
        v-model="page"
        :page_size="page_size"
        :total_rows="characters_count"
        title="Browse Characters">

        <template #intro>
            <p>{{ $siteConfig.browsecopy.characters }}</p>
        </template>

        <template #filter>
            <MenusCharacterSelect v-model="form.selected_character_class" />
            <MenusBookSelect v-model="form.book" />
        </template>
        
        <template #results>
            <div class="d-flex flex-wrap">
                <CharacterImage v-for="character in characters" :key="character.id" :character="character" />
            </div>
        </template>

    </InterfaceList>
    
</template>
  
<!-- <script setup>

useHead({

    titleTemplate: "Character Search - %s"
});

</script> -->


<script>

export default {

    setup() {

    },

    head: {

        titleTemplate: "Character Search - %s"
    },

    data() {

        return {

            characters: [],
            characters_count: 0,
            form: {

                book: "any",
                selected_character_class: "any"
            },
            page: 1,
            page_size: 27
        };
    },

    async fetch() {

        console.log("In InterfaceList fetch");

        this.characters = await useAsyncData("characters", () => queryContent("characters")
            .where({ $and: this.query_array })
            .only(["id", "label", "image", "characterClass"])
            .sortBy("characterClass")
            .limit(this.page_size)
            .skip((this.page - 1) * this.page_size)
            .fetch()
        );

        const filtered_characters = await useAsyncData("characters", () => queryContent("characters")
            .where({ $and: this.query_array })
            .only([])
            .fetch()
        );
        this.characters_count = filtered_characters.length;
    },

    watch: {

        // "deep" watch the form object to catch changes to any of its parts
        form: {

            handler: function (oldVal, newVal) {

                this.page = 1; // reset page on other query changes
                this.$fetch();
            },
            deep: true,
        },

        page() {

            this.$fetch();
        },
    },

    computed: {

        query_array() {

            // Build query conditionally
            var query_array = [];
            if ( this.form.selected_character_class != "any" ) {

                query_array.push({
                    characterClass: { $eq: this.form.selected_character_class },
                });
            }

            if ( this.form.book != "any" ) {

                query_array.push({
                    book: { $eq: this.form.book },
                });
            }

            return query_array;
        },
    },
};
</script>
  
  