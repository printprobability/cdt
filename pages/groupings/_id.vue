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
                                        :character="character" />
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
                                                :key="character.id" :character="character" />
                                        </div>
                                    </v-list-item>
                                </v-list>
                            </v-list-item>
                        </v-list>
                    </v-card-text>

                </v-tab>

                <v-tab title="JSON">
                    <InterfaceJSONButton :href="`/groupings/${grouping.id}.json`" />
                </v-tab>

            </v-tabs>

        </v-card>

    </v-container>

</template>
  
<script>

import _ from "lodash";

export default {

    head() {

        return {

            titleTemplate: `Grouping: ${this.grouping.label} - %s`,
        };
    },

    async asyncData({ $content, params }) {

        const grouping = await $content("groupings", params.id).fetch();

        const characters = await $content("characters")
            .where({ id: { $in: grouping.characters } })
            .sortBy("book", "characterClass")
            .only(["id", "image", "label", "book", "characterClass"])
            .fetch();

        const book_grouped_characters = _.groupBy(characters, (x) => x.book);

        var books = await $content("books")
            .where({ id: { $in: Object.keys(book_grouped_characters) } })
            .sortBy("pqTitle")
            .only(["id", "pqTitle"])
            .fetch();

        // Add character data to each book object
        for ( var i = 0; i < books.length; i++ ) {
            books[i]["characters"] = book_grouped_characters[books[i].id];
        }

        const class_grouped_characters = _.groupBy(

            characters,
            (x) => x.characterClass
        );

        const GROUP_DICT = {

            cl: "Lowercase",
            cu: "Uppercase",
            nu: "Number",
            // pu: "Puncutation" // Currently unused
        };

        const fetched_character_classes = await $content("classes")
            .only(["classname", "label", "group"])
            .where({ classname: { $in: Object.keys(class_grouped_characters) } })
            .sortBy("label")
            .fetch();

        // Group character classes by overarching groups
        const all_character_classes = Object.entries(GROUP_DICT).map((group) => {

            return {

                group: group[1],
                classes: fetched_character_classes
                    .filter((c) => c.group == group[0])
                    .map((c) => {

                        // Add character data to classes
                        // NOTE: Is there some reason for this 'newdict' var? Hoisting?
                        var newdict = c;
                        newdict.characters = class_grouped_characters[c.classname];
                        return newdict;
                    }),
            };
        });

        return {

            grouping,
            books,
            all_character_classes,
        };
    },
};

</script>
  