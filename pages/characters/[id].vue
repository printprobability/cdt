<template>

    <v-container>

        <div class="mb-3">
            <VMedia imageAlt="" :imageSrc="character.image.buffer">
                <template #content>
                    <h1>{{ character.label }}</h1>
                </template>
            </VMedia>
        </div>

        <v-card no-body>

            <v-tabs card>

                <v-tab title="View on Page" active>

                    <v-row>

                        <v-col cols="3">
                            <p>
                                From
                                <NuxtLink :to="{ name: 'books-id', params: { id: book.id } }">
                                    <i>{{ book.pqTitle }}</i> </NuxtLink>, page {{ character.page.sequence }}, line XXX,
                                position
                                {{ character.sequence }}
                            </p>
                            <p>Printer: {{ book.ppPublisher }}</p>
                            <p>
                                Classified as {{ character.characterClass }} with a log
                                probability of
                                {{ character.classProbability }}
                            </p>
                        </v-col>

                        <v-col cols="9">
                            <AnnotatedImage
                                :id="character.id"
                                :image_info_url="`${character.page.image.iiifBase}/info.json`"
                                :overlay="character.absoluteCoords" />
                        </v-col>
                        
                    </v-row>
                </v-tab>

                <v-tab title="Groupings">
                    <v-list-group>
                        <v-list-group-item v-for="grouping in groupings" :key="grouping.id">
                            <GroupingCard :grouping="grouping" :selected_character_id="character.id" />
                        </v-list-group-item>
                    </v-list-group>
                </v-tab>

                <v-tab title="JSON">
                    <InterfaceJSONButton :href="`/characters/${character.id}.json`"></InterfaceJSONButton>
                </v-tab>

            </v-tabs>
        </v-card>

    </v-container>
    
</template>


<script setup>

    const route = useRoute();

    // Async data
    const { data: character } = await useAsyncData("myCharacters", () => queryContent("characters", route.params.id).find());

    const { data: book } = await useAsyncData("myBooks", () => queryContent("books", character.book).find());

    const { data: groupings } = await useAsyncData("myGroupings", () => queryContent("groupings")
        .where({ characters: { $contains: route.params.id } })
        .find()
    );

    // Head
    useHead({ titleTemplate: `Character: ${character.label} - %s`});
</script>