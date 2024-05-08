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
                        <GroupingCard :grouping="grouping" :characters="filteredCharacters" />
                    </v-list-item>
                <v-pagination :length="numPages" v-model="page"></v-pagination>
            </v-list>
        </template>

    </InterfaceList>

</template>

<script setup>

    console.log("In groupings index setup");

    import _ from "lodash";
    import { reactive, ref, watch } from "vue";
    import { computedAsync } from "@vueuse/core";
;
    // Head
    useHead({ titleTemplate: "Grouping Search - %s" });

    // Data
    var filteredGroupings = ref([]);
    var filteredCharacters = ref([]);
    const form = reactive({

        book: "any",
        character_class: "any",
        text: ""
    });
    var page = ref(1);
    var pageSize = ref(5);

    console.log("Past head and data");

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

    // console.log(`filteredGroupings: ${JSON.stringify(filteredGroupings.value)}`);

    // const { data: groupingCharacters } = await useAsyncData("myGroupingCharacters", () => queryContent("groupings")

    const { data: charactersByBookID, refresh: refreshCharactersByBookID } = await useAsyncData("charactersByBookID", async () => {
        
        if ( "any" !== form.book ) {
            
            return queryContent("groupings")
                .where({ book: form.book })
                .only(["id"])
                .find();
        }

        return queryContent("groupings").only(["id"]).find();
    });
    const { data: charactersByCharacterClass, refresh: refreshCharactersByCharacterClass } = await useAsyncData("charactersByCharacterClass", async () => {
        
        if ( "any" !== form.character_class ) {

            return queryContent("characters")
                .where({ characterClass: form.character_class })
                .only(["id"])
                .find();
        }
    
        return queryContent("characters").only(["id"]).find();
    });
    const { data: groupingsByBookID, refresh: refreshGroupingsByBookID } = await useAsyncData("groupingsByBookID", () => queryContent("groupings")
        .where({ characters: { $containsAny: () => charactersByBookID.map((x) => x.id) } })
        .find());
    const { data: groupingsByCharacterClass, refresh: refreshGroupingsByCharacterClass } = await useAsyncData("groupingsByCharacterClass", () => queryContent("groupings")
        .where({ characters: { $containsAny: () => charactersByCharacterClass.map((x) => x.id) } })
        .find());

    console.log("Past loads");
    
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

        // Convert the set to an array
        const uniqueIDsArray = Array.from(uniqueIDsSet);
        
        return uniqueIDsArray;
    }    
    function refreshData() {

        console.log("In refreshData");

        // refreshGroupings();
        // refreshFilteredGroupings();

        filteredGroupings.value = groupingsByBookID.value.filter(obj1 => groupingsByCharacterClass.value.some(obj2 => obj2.id === obj1.id));

        console.log(`filteredGroupings: ${filteredGroupings.value}`);

        filteredCharacters.value = getAllUniqueCharacterIDs();

        console.log(`filteredCharacters: ${filteredCharacters.value}`);

        console.log("Past filteredGroupings intersection");
    }
    function setBook(p_newBookID) {

        console.log(`Groupings index setBook with old book ID: ${form.book.id} and new book ID: ${p_newBookID}`);

        form.book = p_newBookID;
    }

    function setSelectedCharacterClass(p_newCharacterObject) {

        form.character_class = p_newCharacterObject.name;
        // form.selectedCharacterLabel = p_newCharacterObject.id;
    }

    console.log("Past methods definitions");

    // Computed
    const groupingsCount = computed(() => {

        return filteredGroupings.length;
    });
    const numPages = computed(() => {

        console.log(`Groupings index numPages: ${Math.ceil(filteredGroupings.value.length / pageSize.value)}`);

        return Math.ceil(filteredGroupings.value.length / pageSize.value);
    });
    const paginationGroupings = computed(() => {

        const start = (page.value - 1) * pageSize.value;
        const end = start + pageSize.value;

        console.log(`Groupings index paginationGroupings: ${filteredGroupings.value.slice(start, end).length}`);

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
    
    const query = computedAsync(async () => {

        // If a book and a character class have been specified, compose the two queries
        // Promise.resolve(bookQuery);
        // Promise.resolve(characterClassQuery);

        // const book_q = await useFetch("bookQuery", () => queryContent("groupings")
        //     .where(bookQuery)
        //     .find());
        // const cc_q = await useFetch("characterClassQuery", () => queryContent("groupings")
        //     .where(characterClassQuery)
        //     .find());

        if ( !!groupingsByBookID.value && !!groupingsByCharacterClass.value ) {

            const intersection = groupingsByBookID.value.characters.$containsAny.filter((value) =>
                groupingsByCharacterClass.value.characters.$containsAny.includes(value)
            );
            
            return [{ characters: { $containsAny: intersection } }];
        } else if ( !!groupingsByCharacterClass.value ) {
        
            return [groupingsByCharacterClass.value];
        } else if ( !!groupingsByBookID.value ) {
        
            return [groupingsByBookID.value];
        } else {
            
            return [];
        }        
    });

    console.log("Past computed definitions");

    // Watchers

    watch(form, (p_newValue, p_oldValue) => {

        // "deep" watch the form object to catch changes to any of its parts
        // NOTE: In Vue 3, watch on a 'reactive' object implicitly creates a deep watcher
        page.value = 1;
        refreshData();
    });

    watch(page, (p_newValue, p_oldValue) => {

        // refreshData();
    });

    console.log("Past watchers");

    // Update filteredGroupings
    refreshData();

    console.log("Past refresh data");

</script>