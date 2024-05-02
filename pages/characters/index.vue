<template>
    <InterfaceList title="Browse Characters" v-model="page" :total_rows="charactersCount" :page_size="page_size">

        <template #intro>
            <p>{{ $siteConfig.browsecopy.characters }}</p>
        </template>

        <template #filter>
            <MenusCharacterSelect
                :allow_any="true"
                :where="classFilter"
                @updateCharacterClass="setSelectedCharacterClass"/>
            <MenusBookSelect @updateBookSelection="setBook" />
        </template>

        <template #results>
            
            <v-pagination :length="numPages" v-model="page"></v-pagination>
            
            <v-list v-if="characters || characters.length > 0">
                <div class="d-flex flex-wrap">
                    <v-list-item v-for="character in paginationCharacters" :key="character.id">
                        <CharacterImage :character="character" :key="character.id"/>
                    </v-list-item>
                </div>
            </v-list>

            <v-pagination :length="numPages" v-model="page"></v-pagination>
        </template>

    </InterfaceList>
</template>

<script setup>

    import _ from "lodash";
    import { reactive, ref, watch } from "vue";

    // Head
    useHead({ titleTemplate: "Character Search - %s"}); 

    // Data
    var characters = ref([]);
    const form = reactive({

        book: {},
        selectedCharacterClass: "any"
    });
    const page = ref(1);
    const page_size = ref(27);   

    // Start by looking at characters in the first book
    const { data: fetchedBooks } = await useAsyncData("fetchedBooks", () => queryContent("books")
        .sort({ "pqTitle": 1 })
        .only(["id", "label"])
        .find()
    );
    form.book = fetchedBooks.value[0];
    // console.log(`form.book: ${JSON.stringify(form.book)}`);

    var refreshCharacters, refreshFilteredCharacters;
    ({ data: characters, refresh: refreshCharacters } = await useAsyncData("myCharacters", () => queryContent("characters")
        .where({ $and: () => {
        
            // Build query conditionally
            var queryArray = [];
            if ( "any" !== form.selectedCharacterClass ) {

                queryArray.push({ characterClass: form.selectedCharacterClass });
            }
            // if ( "any" !== form.book ) {
                
            //     queryArray.push({ book: form.book });
            // }
            queryArray.push({ book: form.book.id });

            return queryArray;
        }})
        .only(["id", "label", "image", "characterClass", "book"])
        // .skip((page.value - 1) * page_size.value)
        // .limit(page_size.value)
        .sort({ "characterClass": 1 })
        .find()
    ));
    if ( null == characters ) {

        characters.value = [];
    } else {

        form.selectedCharacterClass = characters.value[0].characterClass;
    }

    console.log(`Num characters: ${characters.value.length}`);

    // Methods
    function setBook(p_newBookID) {

        console.log(`In setBook with ${p_newBookID}`);

        form.book = fetchedBooks.find(book => book.id === p_newBookID);
    }
    function setSelectedCharacterClass(p_newCharacterClassname) {

        console.log(`In setSelectedCharacterClass with ${p_newCharacterClassname}`);

        form.selectedCharacterClass = p_newCharacterClassname;
    }

    // Computed
    const charactersCount = computed(() => {

        return characters.value.length;
    });
    const classFilter = computed(() => {

        console.log(`In classFilter with characters: ${JSON.stringify(characters.value)}`);

        return { classname: { $in: _.uniq(characters.value.map((c) => c.characterClass)) } };
    });
    const numPages = computed(() => {

        return Math.ceil(characters.value.length / page_size.value);
    });
    const paginationCharacters = computed(() => {

        const start = (page.value - 1) * page_size.value;
        const end = start + page_size.value;

        return characters.value.slice(start, end);
    });

    // Watchers
    watch(form, (p_newValue, p_oldValue) => {

        console.log("form watch");

        page.value = 1;
        refreshCharacters();
    });
    watch(page, (p_newValue, p_oldValue) => {

        console.log("page watch");

        refreshCharacters();
    });

</script>
