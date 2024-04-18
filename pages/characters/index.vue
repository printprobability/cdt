<template>
    <InterfaceList v-model="page" :page_size="page_size" :total_rows="characters_count" title="Browse Characters">

        <template #intro>
            <p>{{ $siteConfig.browsecopy.characters }}</p>
        </template>

        <template #filter>
            <!-- <MenusCharacterSelect v-model="form.selected_character_class" /> -->
            <MenusBookSelect v-model="form.book" />
        </template>

        <template #results>
            <div class="d-flex flex-wrap">
                <CharacterImage v-for="character in characters" :key="character.id" :character="character" />
            </div>
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
    var filtered_characters = ref([]);
    const form = reactive({

        selected_character_class: "any",
        book: "any"
    });
    var page = ref(1);
    var page_size = ref(27);

    const query_array = computed(() => {
        
        // Build query conditionally
        var query_array = [];
        if ( "any" !== form.selected_character_class ) {

            query_array.push({ characterClass: { $eq: form.selected_character_class } });
        }
        if ( "any" !== form.book ) {
            
            query_array.push({ book: { $eq: form.book } });
        }

        return query_array;
    });    

    var refreshCharacters, refreshFilteredCharacters;
    ({ data: characters, refresh: refreshCharacters } = await useAsyncData("myCharacters", () => queryContent("characters")
        .where({ $and: query_array })
        .only(["id", "label", "image", "characterClass"])
        .sortBy("characterClass")
        .limit(page_size)
        .skip((page - 1) * page_size)
        .find()
    ));
    ({ data: filtered_characters, refresh: refreshFilteredCharacters } = await useAsyncData("filteredCharacters", () => queryContent("characters")
        .where({ $and: query_array })
        .only([])
        .find()
    ));

    // Methods
    function refreshData() {

        refreshCharacters();
        refreshFilteredCharacters();
    }

    // Computed
    const characters_count = computed(() => {

        return filtered_characters.length;
    });

    // Watchers
    watch(form, (p_newValue, p_oldValue) => {

        page = 1;
        refreshData();
    });
    watch(page, (p_newValue, p_oldValue) => {

        refreshData();
    });

</script>
