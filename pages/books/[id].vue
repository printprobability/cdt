<template>

    <v-container>

        <h1>{{ book.pqTitle }}</h1>

        <v-card flat>

            <p>
                Identifiers:
                <v-table>
                    <tbody>
                        <tr>
                            <td v-if="book.estc">
                                ESTC: {{ book.estc }}
                            </td>
                            <td v-if="book.vid">
                                VID: {{ book.vid }}
                            </td>
                            <td v-if="book.eebo">
                                EEBO: {{ book.eebo }}
                            </td>
                            <td v-if="book.tcp">
                                TCP: {{ book.tcp }}
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </p>

            <p v-if="book.pqAuthor">Author: {{ book.pqAuthor }}</p>
            <p v-if="book.colloqPrinter">Printer: {{ book.colloqPrinter }}</p>
            <p v-if="book.ppNotes">Notes: {{ book.ppNotes }}</p>

        </v-card>

        <h2>Noteworthy characters</h2>

        <v-card flat>

            <v-tabs>

                <v-tab active>
                    Group by page
                    <v-card-text>

                        <!-- <v-pagination
                            v-model="index"
                            :disabled="pages_count <= 1"
                            :limit="1"
                            :per-page="1"
                            :total-rows="pages_count"
                            align="center"
                            page-class="hide">
                        </v-pagination> -->

                        <VMedia :title="`p. ${current_page.sequence}`">
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

                    </v-card-text>
                </v-tab>

                <v-tab>
                    Group by character class
                    <v-card-text>
                        <!-- <MenusCharacterSelect v-model="selected_character_class" :allow_any="false" :where="class_filter"  /> -->
                        <!-- <div class="d-flex flex-wrap">
                            <CharacterImage v-for="character in class_characters(selected_character_class)"
                                :key="character.id" :character="character" />
                        </div> -->
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

<script setup>

    import _ from "lodash";
    import { reactive, ref } from "vue";

    const route = useRoute();

    // Data
    var book = reactive({});
    var characters = reactive([{ characterClass: ""}]);
    var index = ref(1);
    var group_type = ref("page");

    // Methods
    
    // Async loaded data
    ({ data: book } = await useAsyncData("myBooks", () => queryContent("books", route.params.id).find()));
    ({ data: characters } = await useAsyncData("myCharacters", () => queryContent("characters")
        .where({ book: route.params.id })
        .only(["id", "page", "label", "image", "characterClass"])
        .sortBy("page.sequence")
        .find()
    ));      

    // Head
    useHead({ titleTemplate: `Book: ${book.pqTitle} - %s` });

    // Methods
    function page_characters(p_page_id) {
        
        return characters.filter((c) => c.page.id == p_page_id);
    }
    function class_characters(p_class_id) {
        
        return characters.filter((c) => c.characterClass == p_class_id);
    }

    // Computed
    const class_filter = computed(() => {
            
        return { classname: { $in: _.uniq(characters.map((c) => c.characterClass)) } };
    });    
    const current_page = computed(() => pages[index - 1]);
    const pages = computed(() => {

        const all_pages = characters.map((c) => c.page);

        return ( characters.length > 0 ) ? _.sortedUniqBy(all_pages, (p) => p.id) : [];
    });
    const pages_count = computed(() => pages.length);
    const selected_character_class = computed(() => {

        return characters.value[0].characterClass;
    });

</script>
  
  
<style scoped>

    .hide {

        /* Hide the numbered display buttons */
        display: none;
    }
</style>
