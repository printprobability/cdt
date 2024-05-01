<template>

    <div>
        {{ selectLabel }}

        <v-select
            :items="allCharacterClasses"
            v-model="selectedOption"
            item-title="name"
            item-value="id"
            @update:modelValue="$emit('updateCharacterClass', selectedOption.name)"
            return-object></v-select>
    </div>
    
</template>
  
<script setup>

    import { defineEmits, reactive, ref } from "vue";

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
    var selectedOption = ref({ id: "a", name: "a_lc" });

    // Emits
    const emit = defineEmits(["updateCharacterClass"]);

    // Props
    const props = defineProps({

        allow_any: { default: true, type: Boolean },
        value: { default: "any", type: String },
        where: { default: {}, type: Object }
    });

    // Async data
    const { data: fetchedCharacterClasses } = await useAsyncData("fetched_character_classes", () => queryContent("classes")
        .only(["classname", "label", "group"])
        .where(props.where)
        .sort({ "label": 1 })
        .find()
    );
    
    const allCharacterClasses = fetchedCharacterClasses.value.map(c => {

        return {

            id: c.label,
            name: c.classname
        }
    });

</script>
