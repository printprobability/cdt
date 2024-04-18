<template>

    <InterfaceList title="Groupings" v-model="page" :total_rows="groupings_count" :page_size="page_size">

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
            <!-- <MenusCharacterSelect v-model="form.character_class" /> -->
            <MenusBookSelect v-model="form.book" />
        </template>

        <template #results>
            <v-list>
                <v-list-item v-for="grouping in groupings" :key="grouping.id">
                    <GroupingCard :grouping="grouping" />
                </v-list-item>
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
    var filtered_groupings = ref([]);
    const form = reactive({

        book: "any",
        character_class: "any",
        text: ""
    });
    var groupings = ref([]);
    var page = ref(1);
    var page_size = ref(5);

    ({ data: grouping, refresh: refreshGroupings } = await useAsyncData("myGroupings", queryContent("groupings")
        .where({ $and: await query })
        .search(form.text)
        .only(["id", "label", "notes", "characters"])
        .limit(page_size)
        .skip((page - 1) * page_size)
        .find()
    ));

    ({ data: filtered_groupings, refresh: refreshFilteredGroupings } = await useAsyncData("myFilteredGroupings", queryContent("groupings")
        .where({ $and: await query })
        .search(form.text)
        .only([])
        .find()  
    ));

    // Methods

    function refreshData() {

        refreshGroupings();
        refreshFilteredGroupings();
    }

    // Computed
    const groupings_count = computed(() => {

        return filtered_groupings.length;
    });

    const result_count_str = computed(() => {

        if ( groupings_count > 1 ) {

            return `${groupings_count} results`;
        } else if ( 1 === groupings_count ) {
        
            return "1 result";
        } else {
        
            return "No results";
        }
    });    

    // Computed async
    const book_query = computedAsync(async () => {

        if ( "any" === form.book ) {

            return null;
        }

        const book_characters = await queryContent("characters")
            .where({ book: { $eq: form.book } })
            .only(["id"])
            .find();
    
        return { characters: { $containsAny: book_characters.map((x) => x.id) } };
    }, null);

    const character_class_query = computedAsync(async () => {

        if ( "any" === form.character_class ) {

            return null;
        }

        const class_characters = await queryContent("characters")
            .where({ characterClass: { $eq: form.character_class } })
            .only(["id"])
            .find();

        return { characters: { $containsAny: class_characters.map((x) => x.id) } };

    }, null);
    
    const query = computedAsync(async () => {

        // If a book and a character class have been specified, compose the two queries
        Promise.resolve(book_query);
        Promise.resolve(character_class_query);

        const book_q = await book_query;
        const cc_q = await character_class_query;

        if ( !!book_q && !!cc_q ) {

            const intersection = book_q.characters.$containsAny.filter((value) =>
                cc_q.characters.$containsAny.includes(value)
            );
            
            return [{ characters: { $containsAny: intersection } }];
        } else if ( !!cc_q ) {
        
            return [cc_q];
        } else if ( !!book_q ) {
        
            return [book_q];
        } else {
            
            return [];
        }        
    });

    // Watchers

    watch(form, (p_newValue, p_oldValue) => {

        // "deep" watch the form object to catch changes to any of its parts
        // NOTE: In Vue 3, watch on a 'reactive' object implicitly creates a deep watcher
        page = 1;
        refreshData();
    });

    watch(page, (p_newValue, p_oldValue) => {

        refreshData();
    });

</script>