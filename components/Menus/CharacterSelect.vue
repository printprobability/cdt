<template>

    <v-select
        id="input-character-class"
        :debounce="500"
        :options="all_character_classes"
        :value="value"
        @input="$emit('input', $event)"
        label="Character class" />

</template>
  
<script>

const ANY_CHAR = {

    text: "any",
    value: "any"
};

export default {

    props: {

        allow_any: {

            type: Boolean,
            default: true,
        },

        value: {

            type: String,
            default: "any",
        },

        where: {},
    },

    data() {

        return {

            all_character_classes: []
        };
    },

    async fetch() {

        const GROUP_DICT = {

            cl: "Lowercase",
            cu: "Uppercase",
            nu: "Number",
            pu: "Puncutation" // Currently unused            
        };

        const fetched_character_classes = await this.$content("classes")
            .only(["classname", "label", "group"])
            .where(this.where)
            .sortBy("label")
            .fetch();

        // Group character classes by overarching groups
        this.all_character_classes = Object.entries(GROUP_DICT).map((group) => {

            return {

                label: group[1],
                options: fetched_character_classes
                    .filter((c) => c.group == group[0])
                    .map((c) => {

                        return { value: c.classname, text: c.label };
                    })
            };
        });

        // Add all characters option to the character selection list
        if ( this.allow_any ) {

            this.all_character_classes.unshift(ANY_CHAR);
        }
    },

    created() {

        this.$fetch();
    }
};

</script>