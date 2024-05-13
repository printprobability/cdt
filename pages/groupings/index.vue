<template>

    <InterfaceList title="Groupings" v-model="page" :total_rows="groupingsCount" :page_size="pageSize">

        <template #intro>
            <p>{{ $siteConfig.browsecopy.groupings }}</p>
        </template>

        <template #filter>
            <v-text-field 
                id="input-grouping-text"
                v-model="form.text"
                label="Grouping title or notes"
                debounce="500"
                placeholder="Aeropagitica" />
            <MenusCharacterSelect
                :allow_any="true"
                @updateCharacterClass="setSelectedCharacterClass"/>            
            <MenusBookSelect @updateBookSelection="setBook" />
        </template>

        <template #results>
            <v-list>
                <v-pagination :length="numPages" v-model="page"></v-pagination>
                    <v-list-item v-for="grouping in paginationGroupings" :key="grouping.id">
                        <p>Grouping ID: {{ grouping.id }}</p>
                        <div v-for="character in grouping.characters">
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;Char ID: {{ character }}</p>
                        </div>
                        <GroupingCard :grouping="grouping" />
                    </v-list-item>
                <v-pagination :length="numPages" v-model="page"></v-pagination>
            </v-list>
        </template>

    </InterfaceList>

</template>

<script setup>

    import _ from "lodash";
    import { reactive, ref, watch } from "vue";
    import { computedAsync } from "@vueuse/core";
;
    // Head
    useHead({ titleTemplate: "Grouping Search - %s" });

    // Data
    const bookIDChanged = ref(false);
    const characterClassChanged = ref(false);
    var filteredGroupings = ref([]);
    const form = reactive({

        book: "any",
        character_class: "any",
        text: ""
    });
    var page = ref(1);
    var pageSize = ref(3);
    const uniqueIDsArray = ref([]);

    // const { data: groupings, refresh: refreshGroupings } = 
    //     await useAsyncData("myGroupings", () => queryContent("groupings")
    //         // .where({ $and: await query })
    //         // .where({ $and: query })
    //         // .where({ $or: [
    //         //     { label: { $contains: form.text } },
    //         //     { notes: { $contains: form.text } }
    //         // ]})
    //         .only(["id", "label", "notes", "characters"])
    //         // .limit(pageSize.value)
    //         // .skip((page.value - 1) * pageSize.value)
    //         .find()
    // );
    // console.log(`groupings: ${JSON.stringify(groupings.value)}`);

    // const { data: filteredGroupings, refresh: refreshFilteredGroupings } = 
    //     await useAsyncData("myFilteredGroupings", () => queryContent("groupings")
    //         // .where({ $and: await query })
    //         .where({ $and: () => query })
    //         // .where({ $or: [
    //         //     { label: { $contains: form.text } },
    //         //     { notes: { $contains: form.text } }
    //         // ]})
    //         .where({ 
    //             label: { $contains: form.text },
    //             notes: { $contains: form.text }
    //         })
    //         .only([])
    //         .find()  
    // );

    // const { data: groupingCharacters } = await useAsyncData("myGroupingCharacters", () => queryContent("groupings")

    const { data: fetchedBooks } = await useAsyncData("fetchedBooks", () => queryContent("books")
        .sort({ "pqTitle": 1 })
        .only(["id", "label"])
        .find()
    );
    form.book = fetchedBooks.value[0].id;

    const { data: characters } = await useAsyncData("characters", () => queryContent("characters")
        .only(["id", "book", "characterClass"])
        .find());

    // const { data: charactersByBookID, refresh: refreshCharactersByBookID } = await useAsyncData("charactersByBookID", async () => {

    //     if ( "any" !== form.book ) {    
            
    //         return await queryContent("characters")
    //             .where({ book: form.book })
    //             .only(["id"])
    //             .find();
    //     }

    //     return await queryContent("characters").only(["id"]).find();
    // });

    const charactersByBookID = ref(characters.value.filter(c => c.book === form.book));

    // const { data: charactersByCharacterClass, refresh: refreshCharactersByCharacterClass } = await useAsyncData("charactersByCharacterClass", async () => {
        
    //     if ( "any" !== form.character_class ) {

    //         return await queryContent("characters")
    //             .where({ characterClass: form.character_class })
    //             .only(["id"])
    //             .find();
    //     }
    
    //     return await queryContent("characters").only(["id"]).find();
    // });
    const charactersByCharacterClass = ref(characters.value);
    const { data: groupingsByBookID, refresh: refreshGroupingsByBookID } = await useAsyncData("groupingsByBookID", () => queryContent("groupings")
        .where({ characters: { $containsAny: () => charactersByBookID.map((x) => x.id) } })
        .find());
    const { data: groupingsByCharacterClass, refresh: refreshGroupingsByCharacterClass } = await useAsyncData("groupingsByCharacterClass", () => queryContent("groupings")
        .where({ characters: { $containsAny: () => charactersByCharacterClass.map((x) => x.id) } })
        .find());

    // Retrieve character objects based on these IDs
    const { data: filteredCharacters, refresh: refreshFilteredCharacters } = await useAsyncData("filteredCharacters", () => queryContent("characters")
        .where({ id: { $in: () => uniqueIDsArray.value } })
        .only(["id", "label", "image"])
        .find());

    // Methods
    function getAllUniqueCharacterIDs() {

        const uniqueIDsSet = new Set();

        // Iterate through each member of filteredGroupings
        filteredGroupings.value.forEach(grouping => {
            // Access the "characters" field (assuming it's an array of ID strings)
            const characters = grouping.characters;

            // Add each ID string to the set
            characters.forEach(id => { uniqueIDsSet.add(id); });
        });

        // Convert the set to an array - filteredCharacters will get refreshed when this value changes
        uniqueIDsArray.value = Array.from(uniqueIDsSet);

        refreshFilteredCharacters();
    }  
    function refreshCharactersByBookID() {
        
        if ( "any" !== form.book ) {

            charactersByBookID.value = characters.value.filter(c => c.book === form.book);
        } else {

            charactersByBookID.value = characters.value;
        }
    }
    function refreshCharactersByCharacterClass() {
        
        if ( "any" !== form.book ) {

            charactersByCharacterClass.value = characters.value.filter(c => c.characterClass === form.character_class);
        } else {

            charactersByCharacterClass.value = characters.value;
        }        
    }
    function refreshData() {

        if ( bookIDChanged.value ) {

            refreshCharactersByBookID();
            refreshGroupingsByBookID();
        }
        if ( characterClassChanged.value ) {

            refreshCharactersByCharacterClass();
            refreshGroupingsByCharacterClass();
        }

        // 1. Find the intersection of groupings that have been filtered by a selected book ID and selected character class
        filteredGroupings.value = groupingsByBookID.value.filter(obj1 => groupingsByCharacterClass.value.some(obj2 => obj2.id === obj1.id));

        // 2. Filter groupings again by any text in form.text
        filteredGroupings.value = filteredGroupings.value.filter(grouping => grouping.label.includes(form.text) || grouping.notes.includes(form.text));

        bookIDChanged.value = false;
        characterClassChanged.value = false;
    }
    function setBook(p_newBookID) {

        form.book = p_newBookID;

        bookIDChanged.value = true;
    }
    function setSelectedCharacterClass(p_newCharacterObject) {

        form.character_class = p_newCharacterObject.name;

        characterClassChanged.value = true;
    }

    // Computed
    const groupingsCount = computed(() => {

        return filteredGroupings.value.length;
    });
    const numPages = computed(() => {

        console.log(`Groupings index numPages: ${Math.ceil(filteredGroupings.value.length / pageSize.value)}`);

        return Math.ceil(filteredGroupings.value.length / pageSize.value);
    });
    const paginationGroupings = computed(() => {

        const start = (page.value - 1) * pageSize.value;
        const end = start + pageSize.value;

        return filteredGroupings.value.slice(start, end);
    });

    // Computed async
    // const bookQuery = computedAsync(async () => {

    //     if ( "any" === form.book ) {

    //         return null;
    //     }

    //     const bookCharacters = await queryContent("characters")
    //         .where({ book: form.book })
    //         .only(["id"])
    //         .find();
    
    //     return { characters: { $containsAny: bookCharacters.map((x) => x.id) } };
    // }, null);

    // const characterClassQuery = computedAsync(async () => {

    //     if ( "any" === form.character_class ) {

    //         return null;
    //     }

    //     const classCharacters = await queryContent("characters")
    //         .where({ characterClass: form.character_class })
    //         .only(["id"])
    //         .find();

    //     return { characters: { $containsAny: classCharacters.map((x) => x.id) } };

    // }, null);
    
    // const query = computedAsync(async () => {

    //     // If a book and a character class have been specified, compose the two queries
    //     // Promise.resolve(bookQuery);
    //     // Promise.resolve(characterClassQuery);

    //     // const book_q = await useFetch("bookQuery", () => queryContent("groupings")
    //     //     .where(bookQuery)
    //     //     .find());
    //     // const cc_q = await useFetch("characterClassQuery", () => queryContent("groupings")
    //     //     .where(characterClassQuery)
    //     //     .find());

    //     if ( !!groupingsByBookID.value && !!groupingsByCharacterClass.value ) {

    //         const intersection = groupingsByBookID.value.characters.$containsAny.filter((value) =>
    //             groupingsByCharacterClass.value.characters.$containsAny.includes(value)
    //         );
            
    //         return [{ characters: { $containsAny: intersection } }];
    //     } else if ( !!groupingsByCharacterClass.value ) {
        
    //         return [groupingsByCharacterClass.value];
    //     } else if ( !!groupingsByBookID.value ) {
        
    //         return [groupingsByBookID.value];
    //     } else {
            
    //         return [];
    //     }        
    // });

    // Watchers

    watch(form, (p_newValue, p_oldValue) => {

        // "deep" watch the form object to catch changes to any of its parts
        // NOTE: In Vue 3, watch on a 'reactive' object implicitly creates a deep watcher
        page.value = 1;

        console.log(`p_oldValue: ${JSON.stringify(p_oldValue)}`);
        console.log(`p_newValue: ${JSON.stringify(p_newValue)}`);

        refreshData();
    });

    // Update filteredGroupings
    refreshData();

</script>