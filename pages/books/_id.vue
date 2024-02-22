<template>

    <v-container>

        <h1>{{ book.pqTitle }}</h1>

        <v-card class="mb-3">

            <p>
                Identifiers:
                <v-list horizontal>
                    <v-list-item v-if="book.estc">
                        ESTC: {{ book.estc }}
                    </v-list-item>
                    <v-list-item v-if="book.vid">
                        VID: {{ book.vid }}
                    </v-list-item>
                    <v-list-item v-if="book.eebo">
                        EEBO: {{ book.eebo }}
                    </v-list-item>
                    <v-list-item v-if="book.tcp">
                        TCP: {{ book.tcp }}
                    </v-list-item>
                </v-list>
            </p>
            <p v-if="book.pqAuthor">Author: {{ book.pqAuthor }}</p>
            <p v-if="book.colloqPrinter">Printer: {{ book.colloqPrinter }}</p>
            <p v-if="book.ppNotes">Notes: {{ book.ppNotes }}</p>

        </v-card>

        <h2>Noteworthy characters</h2>

        <v-card no-body>

            <v-tabs v-model="tab">

                <v-tab active>
                    Group by page
                    <v-card-text>

                        <v-pagination
                            v-model="index"
                            :disabled="pages_count <= 1"
                            :limit="1"
                            :per-page="1"
                            :total-rows="pages_count"
                            align="center"
                            page-class="hide">
                        </v-pagination>

                        <v-card :title="`p. ${current_page.sequence}`">
                            <VMedia>
                                <template #image>
                                    <PageImage :page="current_page" />
                                </template>
                                <template #content>
                                    <div class="d-flex flex-wrap">
                                        <CharacterImage v-for="character in page_characters(current_page.id)"
                                            :key="character.id" :character="character" />
                                    </div>
                                </template>
                            </VMedia>
                        </v-card>

                    </v-card-text>
                </v-tab>

                <v-tab>
                    Group by character class
                    <v-card-text>
                        <MenusCharacterSelect v-model="selected_character_class" :where="class_filter" :allow_any="false" />
                        <div class="d-flex flex-wrap">
                            <CharacterImage v-for="character in class_characters(selected_character_class)"
                                :key="character.id" :character="character" />
                        </div>
                    </v-card-text>
                </v-tab>

                <v-tab>
                    JSON
                    <InterfaceJSONButton :href="`/books/${book.id}.json`" />
                </v-tab>
            </v-tabs>

        </v-card>

    </v-container>

</template>
  
<script>

import _ from "lodash";

export default {

    head() {

        return {

            titleTemplate: `Book: ${this.book.pqTitle} - %s`,
        };
    },

    data() {

        return {

            index: 1,
            group_type: "page",
            selected_character_class: "a_lc"
        };
    },

    async asyncData({ $content, params }) {

        const book = await $content("books", params.id).fetch();

        const characters = await $content("characters")
            .where({ book: params.id })
            .only(["id", "page", "label", "image", "characterClass"])
            .sortBy("page.sequence")
            .fetch();

        return { book, characters };
    },

    computed: {

        class_filter() {

            return {

                classname: {

                    $in: _.uniq(this.characters.map((c) => c.characterClass)),
                }
            };
        },        

        current_page() {
            
            return this.pages[this.index - 1];
        },        

        pages() {
            
            const all_pages = this.characters.map((c) => c.page);

            return ( this.characters.length > 0 ) ? _.sortedUniqBy(all_pages, (p) => p.id) : [];
        },

        pages_count() {

            return this.pages.length;
        }
    },

    methods: {

        class_characters(class_id) {

            return this.characters.filter((c) => c.characterClass == class_id);
        },        

        page_characters(page_id) {

            return this.characters.filter((c) => c.page.id == page_id);
        }
    },

    mounted() {

        // Set the inital selected class to the first available class in this book
        this.selected_character_class = this.characters[0].characterClass;
    }
};

</script>
  
<style scoped>

.hide {

    /* Hide the numbered display buttons */
    display: none;
}

</style>
  