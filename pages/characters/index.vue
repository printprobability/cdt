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
                <!-- :selectedCharacterFromParent="{ classname: form.selectedCharacterClass, label: form.selectedCharacterLabel }" -->
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
        selectedCharacterClass: "any",
        selectedCharacterLabel: "any"
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

    // const { data: characterClasses } = await useAsyncData("myCharacterClasses", () => queryContent("classes").find());

    // const { data: allBookCharacters } = await useAsyncData("allBookCharacters", () => queryContent("characters")
    //     .where({ book: form.book.id })
    //     .only(["id", "label", "image", "characterClass", "book"])
    //     .sort({ "characterClass": 1 })
    //     .find());
    // setSelectedCharacterClass({ id: form.selectedCharacterLabel, name: form.selectedCharacterClass });       

    var refreshCharacters;
    ({ data: characters, refresh: refreshCharacters } = await useAsyncData("myCharacters", () => queryContent("characters")
        // .where(() => {

        //     const query = { book: form.book.id };
        //     if ( "any" !== form.selectedCharacterClass ) {

        //         return { $and: [query, { characterClass: form.selectedCharacterClass }] };
        //     }
        //     return query;
        // })            
        // .where({ $match: () => {
        
        //     // Build query conditionally
        //     const queryDict = { book: form.book.id };
        //     if ( "any" !== form.selectedCharacterClass ) {

        //         queryDict.characterClass = form.selectedCharacterClass;
        //     }

        //     console.log(`queryDict: ${JSON.stringify(queryDict)}`);

        //     return queryDict;
        // }})
        // .where(( "any" === form.selectedCharacterClass ) ? 
        //     { book: form.book.id } : { book: form.book.id, characterClass: form.selectedCharacterClass })
        // .where({ book: form.book.id })
        // .where(( "any" !== form.selectedCharacterClass ) ? { characterClass: form.selectedCharacterClass } : {})
        .only(["id", "label", "image", "characterClass", "book"])
        // .skip((page.value - 1) * page_size.value)
        // .limit(page_size.value)
        .sort({ "characterClass": 1 })
        .find()
    ));

    if ( null == characters ) {

        characters.value = [];
    }

    var filteredCharacters = ref(characters.value.filter(x => x.book === form.book.id));

    // Methods
    function setBook(p_newBookID) {

        form.book = fetchedBooks.value.find(book => book.id === p_newBookID);
    }
    function setSelectedCharacterClass(p_newCharacterObject) {

        form.selectedCharacterClass = p_newCharacterObject.name;
        form.selectedCharacterLabel = p_newCharacterObject.id;
    }

    // Computed
    const charactersCount = computed(() => {

        return filteredCharacters.value.length;
    });
    const classFilter = computed(() => {

        return { classname: { $in: _.uniq(characters.value.map((c) => c.characterClass)) } };
    });
    const numPages = computed(() => {

        return Math.ceil(filteredCharacters.value.length / page_size.value);
    });
    const paginationCharacters = computed(() => {

        const start = (page.value - 1) * page_size.value;
        const end = start + page_size.value;

        return filteredCharacters.value.slice(start, end);
    });

    // Watchers
    watch(form, (p_newValue, p_oldValue) => {

        page.value = 1;

        filteredCharacters.value = characters.value.filter(x => x.book === form.book.id);

        if ( "any" !== form.selectedCharacterClass ) { 

            filteredCharacters.value = filteredCharacters.value.filter(x => x.characterClass === form.selectedCharacterClass);
        }

        // characters.value = characters.value.filter(c => c.characterClass === form.selectedCharacterClass);
    });
    watch(page, (p_newValue, p_oldValue) => {

        // characters.value = characters.value.filter(c => c.characterClass === form.selectedCharacterClass);
    });

</script>
