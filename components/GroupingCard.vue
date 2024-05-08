<template>

    <v-container>

        <h3>
            <NuxtLink :to="groupingLink">{{ props.grouping.label }}</NuxtLink>
        </h3>

        <div class="d-flex flex-wrap">

            <CharacterImage v-for="character in filteredCharacters" :key="character.id" :character="character"
                :selected="isSelectedCharacter(character.id)" />

            <NuxtLink :to="groupingLink">
                <span v-if="nChars > 10"> {{ nChars - 10 }} more characters... </span>
            </NuxtLink>
        </div>

    </v-container>

</template>
  
<script setup>

    // Props

    const props = defineProps({

        filteredCharacters: Array,
        grouping: Object,
        selected_character_id: String
    });
    
    // Data

    var filteredCharacters = ref([]);
    if ( props.filteredCharacters ) {

        filteredCharacters.value = props.filteredCharacters;
    } else {

        ({ data: filteredCharacters } = await useAsyncData("myCharacters", () => queryContent("characters")
        // .only(["id", "label", "image"])    
        .where({ id: { $in: props.grouping.characters }})
        .sort({"characterClass": 1})
        .limit(10)
        .find()
    ));        
    }

    // Methods

    function isSelectedCharacter(p_charID) {

        return p_charID === props.selected_character_id;
    }

    // Computed

    const groupingLink = computed(() => {

        return { name: "groupings-id", params: { id: props.grouping.id } };
    });

    const nChars = computed(() => {

        return props.grouping.characters.length;
    });

</script>
  