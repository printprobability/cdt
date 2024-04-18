<template>

    <div>
        <v-label
            id="input-character-class-group"
            text="Character class"></v-label>

        <v-select
            :items="all_character_classes"
            debounce="500"
            id="input-character-class"
            label="Character class"
            @input="$emit('input', $event)"></v-select>            
    </div>
    
</template>
  
<script setup>

    import { reactive } from "vue";

    // Data
    const ANY_CHAR = reactive({
        
        text: "any",
        value: "any"
    });
    const GROUP_DICT = reactive({

        cl: "Lowercase",
        cu: "Uppercase",
        nu: "Number",
        pu: "Puncutation" // Currently unused    
    });

    // Emits
    const emit = defineEmits(["input"]);

    // Props
    const props = defineProps({

        allow_any: { default: true, type: Boolean },
        value: { default: "any", type: String },
        where: {}
    });

    // Async data
    const { data: fetched_character_classes, refresh: refreshFetchedCharacterClasses } = await useAsyncData("fetched_character_classes", () => queryContent("classes")
        .only(["classname", "label", "group"])
        .where(where)
        .sortBy("label")
        .find()
    );

    // Group character classes by overarching groups
    const { data: all_character_classes, refresh: refreshAllCharacterClasses } = useAsyncData("allCharacterClasses", () => reactive(Object.entries(GROUP_DICT).map((group) => {

        return {

            label: group[1],
            options: fetched_character_classes
                .filter((c) => c.group == group[0])
                .map((c) => {
                    return {

                        text: c.label,
                        value: c.classname
                    };
                }),
        };
    })));

    // Watchers
    watch(all_character_classes, (p_newValue, p_oldValue) => {

        // Only occurs one time, once 'all_character_classes' is fetched
        if ( !!all_character_classes ) {
        
            // Add all characters option to the character selection list
            if ( props.allow_any ) {

                all_character_classes.unshift(ANY_CHAR);
            }
        }
    }, { once: true });

</script>
