<template>

    <v-container>

        <h1>{{ grouping.label }}</h1>
        <p>{{ grouping.notes }}</p>

        <hr />

        <v-card no-body>

            <v-tabs v-model="tab" card>

                <v-tab title="Group by book" active>

                    <v-card-text>
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
                    </v-card-text>

                </v-tab>

                <v-tab title="Group by character class">

                    <v-card-text>
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
                    </v-card-text>

                </v-tab>

                <v-tab title="JSON">
                    <InterfaceJSONButton :href="`/groupings/${grouping.id}.json`"></InterfaceJSONButton>
                </v-tab>

            </v-tabs>

        </v-card>

    </v-container>

</template>

<script setup>

    import _ from "lodash";
    import { ref } from "vue";

    const route = useRoute();

    // Head
    useHead({ titleTemplate: `Grouping: ${grouping.label} - %s` });

    // Data

    const grouping = await useAsyncData("myGroupings", () => queryContent("groupings", route.params.id).find());

    const characters = await useAsyncData("myCharacters", () => queryContent("characters")
        .where({ id: { $in: grouping.characters } })
        .sort({ book : 1, characterClass: 2 })
        .only(["id", "image", "label", "book", "characterClass"])
        .find()
    );

    const book_grouped_characters = ref(_.groupBy(characters, (x) => x.book));
    var books = await useAsyncData("myBooks", () => queryContent("books")
        .where({ id: { $in: Object.keys(book_grouped_characters) } })
        .sortBy("pqTitle")
        .only(["id", "pqTitle"])
        .find()
    );
    // Add character data to each book object
    for ( var i = 0; i < books.length; i++ ) {
        books[i]["characters"] = book_grouped_characters[books[i].id];
    }

    const class_grouped_characters = ref(_.groupBy(characters, (x) => x.characterClass));

    const GROUP_DICT = reactive({

      cl: "Lowercase",
      cu: "Uppercase",
      nu: "Number"
      // pu: "Puncutation" // currently unused
    });

    const fetched_character_classes = await useAsyncData("fetchedCharacters", () => queryContent("classes")
        .only(["classname", "label", "group"])
        .where({ classname: { $in: Object.keys(class_grouped_characters) } })
        .sortBy("label")
        .find()
    );

    // Group character classes by overarching groups
    const all_character_classes = reactive(Object.entries(GROUP_DICT).map((group) => {

        return {
            
            group: group[1],
            classes: fetched_character_classes
                        .filter((c) => c.group == group[0])
                        .map((c) => {
            
                            // Add character data to classes
                            var newdict = c;
                            newdict.characters = class_grouped_characters[c.classname];
                            return newdict;
                        })
        };
    }));

</script>