<template>
  <v-container>
    <v-btn variant="outlined" class="float-left" color="red-darken-3" icon="mdi-arrow-u-left-bottom" rounded="5" @click="goBack"/>

    <v-main>
      <h1 class="text-center">Character class: {{ character.character_class }}</h1>

      <v-row class="mt-2">
        <v-col cols="12" md="6">
          <div style="min-width: 100%">
            <AnnotatedImage
              :id="`char-${character.char_id}`"
              :src="character.web_url"
              :overlay="annotation"
            />
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="5" md="3">
              <div class="float-end">
                <v-img
                  width="90px"
                  height="110px"
                  max-width="90px"
                  max-height="110px"
                  class="border border-sm border-opacity-100 border-black"
                  lazy-src="/img/image.jpg"
                  :alt="character.character_class"
                  :src="character.web_url"
                />
              </div>
            </v-col>
            <v-col cols="7" md="9">
              <div style="width: 30vw">
                <strong>Book:</strong> {{ character.book.pq_title }}
              </div>

              <div style="width: 30vw" class="mt-2">
                <strong>Date:</strong> {{ character.book.pq_year_early }}
              </div>

              <div style="width: 30vw" class="mt-2">
                <strong>Printer:</strong>&nbsp;
                <NuxtLink
                  :to="{ name: 'index', query: { printer_like: character.group_label } }"
                  @click="clearNuxtState((key) => key.startsWith('chars'))"
                >
                  {{ character.group_label }}
                </NuxtLink>
              </div>

              <div style="width: 30vw" class="mt-2">
                <strong>Source Book:</strong> ESTC {{ character.book.estc }}
              </div>

              <div style="width: 30vw" class="mt-2">
                <strong>Cite As</strong>:
                <NuxtLink :to="{ name: 'characters-id', params: { id: character.unique_id} }">{{ citeAs }}</NuxtLink>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <div class="mt-10" style="width: 80vw">
        <h2 class="text-center">
          Other examples of character class (A, B, C, etx) for printer in CDT
        </h2>

        <CharacterGrid v-if="otherCharacters" :characters="otherCharacters" center/>
      </div>
    </v-main>
  </v-container>
</template>

<script setup>
import CharacterGrid from "~/components/CharacterGrid.vue";
import {AnnotatedImage} from '#components';

// Resoures
const {$axios} = useNuxtApp();

// Route
const route = useRoute();
// Router
const router = useRouter()

// Fetch detail
const {data: character} = await useAsyncData(
  "fetchCharacterDetail",
  async () => (await $axios.get(`/characters/${route.params.id}`)).data
);

// Fetch other characters
const {data: otherCharacters} = await useAsyncData(
  "fetchOtherCharacters",
  async () => (await $axios.get(
    "/characters/?limit=10",
    {
      params: {
        limit: 10,
        pq_year_early: 1660,
        pq_year_late: 1700,
        character_class: character.value['character_class'],
        group_id: character.value['group_id']
      }
    }
  )).data.results
);

if (!character.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
    fatal: true,
  })
}

const citeAs = computed(() => `"${character.value['unique_id']}," in Catalog of Distinctive Type (CDT). Edited by Christopher N.Warren, et al.,`)

// Image annotation
const annotation = computed(() => ({
  x: character.value.x_min,
  y: character.value.y_min,
  w: character.value.x_max - character.value.x_min,
  h: character.value.y_max - character.value.y_min,
}))

// Head
useHead({titleTemplate: `Character: ${character.value.character_class} - %s`});

// Go back
const goBack = () => router.back()
</script>
