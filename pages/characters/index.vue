<template>
    <InterfaceList title="Browse Characters" v-model="page" :total_rows="charactersCount" :page_size="page_size">

        <template #intro>
            <p>{{ $siteConfig.browsecopy.characters }}</p>
        </template>

        <template #filter>
            <MenusCharacterSelect @updateCharacterClass="setSelectedCharacterClass"/>
            <MenusBookSelect @updateBookSelection="setBook" />
        </template>

        <template #results>
            <div class="d-flex flex-wrap">
                <CharacterImage v-for="character in characters"
                    :character="character"    
                    :key="character.id"/>
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
    var filteredCharacters = ref([]);
    const form = ref({

        book: "any",
        selectedCharacterClass: "any"
    });
    var page = ref(1);
    var page_size = ref(27);

    const queryArray = computed(() => {
        
        // Build query conditionally
        var queryArray = [];
        if ( "any" !== form.selectedCharacterClass ) {

            queryArray.push({ characterClass: form.selectedCharacterClass });
        }
        if ( "any" !== form.book ) {
            
            queryArray.push({ book: form.book });
        }

        return queryArray;
    });    

    var refreshCharacters, refreshFilteredCharacters;
    ({ data: characters, refresh: refreshCharacters } = await useAsyncData("myCharacters", () => queryContent("characters")
        .where({ $and: () => {
        
            // Build query conditionally
            var queryArray = [];
            if ( "any" !== form.selectedCharacterClass ) {

                queryArray.push({ characterClass: form.selectedCharacterClass });
            }
            if ( "any" !== form.book ) {
                
                queryArray.push({ book: form.book });
            }

            return queryArray;
        }})
        .only(["id", "label", "image", "characterClass"])
        .sort({ "characterClass": 1 })
        .limit(page_size)
        .skip((page - 1) * page_size)
        .find()
    ));
    ({ data: filteredCharacters, refresh: refreshFilteredCharacters } = await useAsyncData("filteredCharacters", () => queryContent("characters")
        .where({ $and: () => {
        
            // Build query conditionally
            var queryArray = [];
            if ( "any" !== form.selectedCharacterClass ) {

                queryArray.push({ characterClass: form.selectedCharacterClass });
            }
            if ( "any" !== form.book ) {
                
                queryArray.push({ book: form.book });
            }

            return queryArray;
        }})
        .only([])
        .find()
    ));
    const filtered_characters = await this.$content("characters")
      .where({ $and: this.query_array })
      .only([])
      .fetch();
    this.characters_count = filtered_characters.length;


    // Methods
    function refreshData() {

        refreshCharacters();
        refreshFilteredCharacters();
    }
    function setBook(p_newBook) {

        form.value.book = p_newBook;
    }
    function setSelectedCharacterClass(p_newCharacterClassname) {

        form.value.selectedCharacterClass = p_newCharacterClassname;
    }

    // Computed
    const charactersCount = computed(() => {

        return filteredCharacters.length;
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
