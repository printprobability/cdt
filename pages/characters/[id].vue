<template>

    <v-container>

        <div class="mb-3">

            <VMedia imageAlt="" :imageSrc="character[0].image.buffer">
                <template #content>
                    <h1>{{ character[0].label }}</h1>
                </template>
            </VMedia>

        </div>

        <v-card border="sm" flat>

            <v-tabs v-model="tab">
                <v-tab value="one">View on Page</v-tab>
                <v-tab value="two">Groupings</v-tab>
                <v-tab value="three">JSON</v-tab>
            </v-tabs>
        
            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item class="noteworthy_tab" :transition="false" value="one">
                        <v-row>
                            <v-col cols="3">
                                <p>
                                    From
                                    <NuxtLink :to="{ name: 'books-id', params: { id: book.id } }">
                                        <i>{{ book.pqTitle }}</i> </NuxtLink>, page {{ character[0].page.sequence }}, line XXX,
                                    position
                                    {{ character[0].sequence }}
                                </p>
                                <p>Printer: {{ book.ppPublisher }}</p>
                                <p>
                                    Classified as {{ character[0].characterClass }} with a log
                                    probability of
                                    {{ character[0].classProbability }}
                                </p>
                            </v-col>

                            <v-col cols="9">
                                <!-- <AnnotatedImage
                                    :id="character.id"
                                    :image_info_url="`${character.page.image.iiifBase}/info.json`"
                                    :overlay="character.absoluteCoords" /> -->
                            </v-col>
                        </v-row>
                    </v-window-item>
                    <v-window-item class="noteworthy_tab" :transition="false" value="two">
                        <v-list>
                            <v-list-item v-for="grouping in groupings" :key="grouping.id">
                                <GroupingCard :grouping="grouping" :selected_character_id="character[0].id" />
                            </v-list-item>
                        </v-list>
                    </v-window-item>
                    <v-window-item class="noteworthy_tab" :transition="false" value="three">
                        <!-- <InterfaceJSONButton :href="`/characters/${character[0].id}.json`"></InterfaceJSONButton> -->
                        <pre>{{ formattedCharacterJSON }}</pre>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </v-container>
    
</template>


<script setup>

    const route = useRoute();

    // Data
    const tab = ref(null);

    // Async data
    const { data: character } = await useAsyncData("myCharacters", () => queryContent("characters", route.params.id).find());

    const { data: book } = await useAsyncData("myBooks", () => queryContent("books", character.value.book).find());

    const { data: groupings } = await useAsyncData("myGroupings", () => queryContent("groupings")
        .where({ characters: { $contains: route.params.id } })
        .find()
    );

    // Computed

    const formattedCharacterJSON = computed(() => {

        return JSON.stringify(character.value[0], customReplacer, 4);
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

    // Head
    useHead({ titleTemplate: `Character: ${character.value[0].label} - %s`});

</script>