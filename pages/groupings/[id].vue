<template>

    <v-container>

        <h1>{{ grouping.label }}</h1>
        <p>{{ grouping.notes }}</p>

        <v-card border="sm" flat>

            <v-tabs v-model="tab">
                <v-tab value="one">Group by book</v-tab>
                <v-tab value="two">Group by character class</v-tab>
                <v-tab value="three">JSON</v-tab>
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">

                    <v-window-item class="noteworthy_tab" :transition="false" value="one">
                        <v-list>
                            <v-list-item v-for="book in books" :key="book.id">
                                <h5>
                                    <NuxtLink :to="{ name: 'books-id', params: { id: book.id } }">
                                        <i>{{ book.pqTitle }}</i>
                                    </NuxtLink>
                                </h5>
                                <div class="d-flex flex-wrap">
                                    <CharacterImage v-for="character in book.characters" :key="character.id"
                                        :character="character"></CharacterImage>
                                </div>
                            </v-list-item>
                        </v-list>
                    </v-window-item>

                    <v-window-item class="noteworthy_tab" :transition="false" value="two">
                        <v-list>
                            <v-list-item v-for="character_group in all_character_classes"
                                :key="character_group.group">
                                <h5>{{ character_group.group }}</h5>
                                <v-list>
                                    <v-list-item v-for="character_class in character_group.classes"
                                        :key="character_class.classname">
                                        {{ character_class.label }}
                                        <div class="d-flex flex-wrap">
                                            <CharacterImage v-for="character in character_class.characters"
                                                :key="character.id" :character="character"></CharacterImage>
                                        </div>
                                    </v-list-item>
                                </v-list>
                            </v-list-item>
                        </v-list>
                    </v-window-item>

                    <v-window-item class="noteworthy_tab" :transition="false" value="three">
                        <!-- <InterfaceJSONButton :href="`/groupings/${grouping.id}.json`"></InterfaceJSONButton> -->
                        <pre>{{ formattedGroupingJSON }}</pre>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>

    </v-container>

</template>

<script setup>

    import _ from "lodash";
    import { ref } from "vue";

    const route = useRoute();

    // Data
    const tab = ref(null);
    const { data: grouping } = await useAsyncData("myGroupings", () => queryContent("groupings", route.params.id).find());

    const { data: characters } = await useAsyncData("myCharacters", () => queryContent("characters")
        .where({ id: { $in: grouping.value[0].characters } })
        .sort({ book : 1, characterClass: -1 })
        .only(["id", "image", "label", "book", "characterClass"])
        .find()
    );

    const book_grouped_characters = ref(_.groupBy(characters.value, (x) => x.book));

    var { data: books } = await useAsyncData("myBooks", () => queryContent("books")
        .where({ id: { $in: Object.keys(book_grouped_characters.value) } })
        .sort({ pqTitle: 1 })
        .only(["id", "pqTitle"])
        .find()
    );

    // Add character data to each book object
    for ( let index = 0; index < books.value.length; index++ ) {

        books.value[index]["characters"] = book_grouped_characters.value[books.value[index].id];
    }

    const class_grouped_characters = ref(_.groupBy(characters.value, (x) => x.characterClass));

    const GROUP_DICT = reactive({

      cl: "Lowercase",
      cu: "Uppercase",
      nu: "Number"
      // pu: "Puncutation" // currently unused
    });

    const { data: fetched_character_classes } = await useAsyncData("fetchedCharacterClasses", () => queryContent("classes")
        .only(["classname", "label", "group"])
        .where({ classname: { $in: Object.keys(class_grouped_characters.value) } })
        .sort({ label: 1 })
        .find()
    );

    // Group character classes by overarching groups
    const all_character_classes = ref(Object.entries(GROUP_DICT).map((group) => {

        return {
            
            group: group[1],
            classes: fetched_character_classes.value
                        .filter((c) => c.group === group[0])
                        .map((c) => {
            
                            // Add character data to classes
                            var newDict = c;
                            newDict.characters = class_grouped_characters.value[c.classname];
                            return newDict;
                        })
        };
    }));

    // Head
    useHead({ titleTemplate: `Grouping: ${grouping.value[0].label} - %s` });

    // Computed
    const formattedGroupingJSON = computed(() => {

        return JSON.stringify(grouping.value[0], customReplacer, 4);
    });
    
    // Methods
    function customReplacer(key, value) {

        // List of keys to ignore (e.g., 'privateProperty1', 'privateProperty2')
        const keysToIgnore = [

            "_path",
            "_dir",
            "_draft",
            "_partial",
            "_locale",
            "_id",
            "_type",
            "title",
            "_source",
            "_file",
            "_extension"
        ];

        // Omit the key from the output
        if ( keysToIgnore.includes(key) ) {

            return undefined; 
        }

        // Include other keys
        return value; 
    }    

</script>