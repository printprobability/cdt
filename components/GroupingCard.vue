<template>

    <v-container>

        <h3>
            <NuxtLink :to="grouping_link">{{ props.grouping.label }}</NuxtLink>
        </h3>

        <div class="d-flex flex-wrap">

            <CharacterImage v-for="character in characters" :key="character.id" :character="character"
                :selected="is_selected_character(character.id)" />

            <NuxtLink :to="grouping_link">
                <span v-if="n_chars > 10"> {{ n_chars - 10 }} more characters... </span>
            </NuxtLink>
        </div>

    </v-container>

</template>
  
<script setup>

    import { ref } from "vue";

    // Props

    const props = defineProps({

        grouping: Object,
        selected_character_id: String
    });
    
    // Data

    const characters = await useAsyncData("myCharacters", () => queryContent("characters")
        .where({ id: { $in: props.grouping.characters }})
        .sortBy("characterClass")
        .only(["id", "image", "label"])
        .limit(10)
        .find()
    );

    // Methods

    function is_selected_character(p_char_id) {

        return p_char_id === props.selected_character_id;
    }

    // Computed

    const grouping_link = computed(() => {

        return { name: "groupings-id", params: { id: props.grouping.id } };
    });

    const n_chars = computed(() => {

        return props.grouping.characters.length;
    });

</script>
  