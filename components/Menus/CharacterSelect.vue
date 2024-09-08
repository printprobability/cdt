<template>

    <div>
        {{ selectLabel }}

        <v-select
            :items="allCharacterClasses"
            v-model="selectedOption"
            item-title="name"
            item-value="id"
            @update:modelValue="$emit('updateCharacterClass', selectedOption)"
            return-object></v-select>
    </div>
    
</template>
  
<script setup>

    import { defineEmits, ref } from "vue";

    // Data
    const ANY_CHAR = ref({
        
        text: "any",
        value: "any"
    });
    const selectLabel = ref("Character class");
    const GROUP_DICT = {

        cl: "Lowercase",
        cu: "Uppercase",
        nu: "Number",
        pu: "Puncutation" // Currently unused    
    };

    // Emits
    const emit = defineEmits(["updateCharacterClass"]);

    // Props
    const props = defineProps({

        allow_any: { default: true, type: Boolean },
        // selectedCharacterFromParent: { type: Object },
        value: { default: "any", type: String },
        where: { default: {}, type: Object }
    });

    // Async data
    const { data: fetchedCharacterClasses } = await useAsyncData("fetched_character_classes", () => queryContent("classes")
        .only(["classname", "label", "group"])
        .where( ( props.allow_any ) ? {} : props.where)
        .sort({ "label": 1 })
        .find()
    );
    if ( props.allow_any ) {
               
        fetchedCharacterClasses.value.unshift({ classname: ANY_CHAR.value.value, label: ANY_CHAR.value.text });
    }

    const allCharacterClasses = fetchedCharacterClasses.value.map(c => {

        return {

            id: c.label,
            name: c.classname
        }
    });

    // selectedOption.value.id = props.selectedCharacterFromParent.label;
    // selectedOption.value.name = props.selectedCharacterFromParent.classname;

    // Set to first character fetched or 'any'
    const selectedOption = ref({
        id: fetchedCharacterClasses.value[0].label,
        name: fetchedCharacterClasses.value[0].classname
    });

</script>
