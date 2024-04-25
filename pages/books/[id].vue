<template>

    <v-container>

        <h1>{{ props.book.pqTitle }}</h1>

        <v-card flat>

            <p>
                Identifiers:
                <v-table>
                    <tbody>
                        <tr>
                            <td v-if="props.book.estc">
                                ESTC: {{ props.book.estc }}
                            </td>
                            <td v-if="props.book.vid">
                                VID: {{ props.book.vid }}
                            </td>
                            <td v-if="props.book.eebo">
                                EEBO: {{ props.book.eebo }}
                            </td>
                            <td v-if="props.book.tcp">
                                TCP: {{ props.book.tcp }}
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </p>

            <p v-if="props.book.pqAuthor">Author: {{ props.book.pqAuthor }}</p>
            <p v-if="props.book.colloqPrinter">Printer: {{ props.book.colloqPrinter }}</p>
            <p v-if="props.book.ppNotes">Notes: {{ props.book.ppNotes }}</p>

        </v-card>

        <h2>Noteworthy characters</h2>

        <v-card flat>

            <v-tabs>

                <v-tab active>
                    Group by page
                    <v-card>
                        <v-card-text>

                            <v-pagination :length="pages_count" v-model="index"></v-pagination>

                            <VMedia :title="`p. ${current_page.sequence}`">
                                <template #image>
                                    <PageImage :page="current_page" />
                                </template>
                                <template #content>
                                    <div class="d-flex flex-wrap">
                                        <CharacterImage v-for="character in pageCharacters(current_page.id)"
                                            :key="character.id" :character="character" />
                                    </div>
                                </template>
                            </VMedia>

                            <v-pagination :length="pages_count" v-model="index"></v-pagination>

                        </v-card-text>
                    </v-card>
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
                    <InterfaceJSONButton :href="`/books/${props.book.id}.json`" />
                </v-tab>
            </v-tabs>

        </v-card>

    </v-container>

</template>

<script setup>

    import _ from "lodash";
    import { reactive, ref } from "vue";

    const route = useRoute();

    // Props
    const props = defineProps({
        book: Object
    });

    // Data
    var book = reactive({});
    var characters = reactive([{ characterClass: ""}]);
    var index = ref(1);
    var group_type = ref("page");

    // Methods
    
    // Async loaded data
    // ({ data: book } = await useAsyncData("myBooks", () => queryContent("books", route.params.id).find()));
    ({ data: characters } = await useAsyncData("myCharacters", () => queryContent("characters")
        .where({ book: route.params.id })
        .only(["id", "page", "label", "image", "characterClass"])
        .sortBy("page.sequence")
        .find()
    ));      

    // Head
    useHead({ titleTemplate: `Book: ${props.book.pqTitle} - %s` });

    // Methods
    function pageCharacters(p_page_id) {
        
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
