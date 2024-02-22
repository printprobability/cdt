<template>

    <InterfaceList title="Groupings" v-model="page" :total_rows="groupings_count" :page_size="page_size">

        <template #intro>
            <p>{{ $siteConfig.browsecopy.groupings }}</p>
        </template>

        <template #filter>
            <v-text-field 
                id="input-grouping-text"
                v-model="form.text"
                label="Grouping title or notes"
                debounce="500"
                placeholder="Aeropagitica" />
            <MenusCharacterSelect v-model="form.character_class" />
            <MenusBookSelect v-model="form.book" />
        </template>

        <template #results>
            <v-list>
                <v-list-item v-for="grouping in groupings" :key="grouping.id">
                    <GroupingCard :grouping="grouping" />
                </v-list-item>
            </v-list>
        </template>

    </InterfaceList>

</template>
  
<script>

import _ from "lodash";

export default {

    head: {

        titleTemplate: "Grouping Search - %s",
    },

    data() {

        return {

            form: {

                book: "any",
                character_class: "any",
                text: ""
            },
            groupings: [],
            groupings_count: 0,
            page: 1,
            page_size: 5
        };
    },

    async fetch() {

        this.groupings = await this.$content("groupings")
            .where({ $and: await this.query })
            .search(this.form.text)
            .only(["id", "label", "notes", "characters"])
            .limit(this.page_size)
            .skip((this.page - 1) * this.page_size)
            .fetch();

        const filtered_groupings = await this.$content("groupings")
            .where({ $and: await this.query })
            .search(this.form.text)
            .only([])
            .fetch();
        this.groupings_count = filtered_groupings.length;
    },

    computed: {

        async book_query() {

            // NOTE: Maybe change this to !==
            if ( this.form.book != "any" ) {

                const book_characters = await this.$content("characters")
                    .where({ book: { $eq: this.form.book } })
                    .only(["id"])
                    .fetch();

                return {

                    characters: {

                        $containsAny: book_characters.map((x) => x.id),
                    }
                };
            }

            return null;
        },

        async character_class_query() {

            // NOTE: Maybe change this to !==
            if ( this.form.character_class != "any" ) {

                const class_characters = await this.$content("characters")
                    .where({ characterClass: { $eq: this.form.character_class } })
                    .only(["id"])
                    .fetch();

                return {

                    characters: {

                        $containsAny: class_characters.map((x) => x.id),
                    }
                };
            }

            return null;
        },

        async query() {

            // If a book and a character class have been specified, compose the two queries
            Promise.resolve(this.book_query);
            Promise.resolve(this.character_class_query);
            const book_q = await this.book_query;
            const cc_q = await this.character_class_query;

            if ( !!book_q && !!cc_q ) {

                const intersection = book_q.characters.$containsAny.filter((value) =>
                    cc_q.characters.$containsAny.includes(value)
                );

                return [{ characters: { $containsAny: intersection } }];
            } else if (!!cc_q) {

                return [cc_q];
            } else if (!!book_q) {

                return [book_q];
            }

            return [];
        },

        result_count_str() {

            if ( this.groupings_count > 1 ) {

                return `${this.groupings_count} results`;
            } else if ( this.groupings_count == 1 ) {

                return "1 result";
            }
            
            return "No results";
        },
    },

    watch: {

        // "deep" watch the form object to catch changes to any of its parts
        form: {

            handler: function (oldVal, newVal) {

                this.page = 1;
                this.$fetch();
            },
            deep: true,
        },

        page() {

            this.$fetch();
        }
    }
};

</script>