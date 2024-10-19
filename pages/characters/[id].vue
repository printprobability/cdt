<template>
  <v-container>
    <v-main class="d-flex flex-column align-center justify-center">
      <h1>{{ character.character_class }}</h1>

      <div class="d-flex">
        <div>
          <v-img
            width="90px"
            height="110px"
            max-width="90px"
            max-height="110px"
            class="border border-sm border-opacity-100 border-black"
            lazy-src="/img/image.jpg"
            :id="character.id"
            :alt="character.label"
            :src="character.web_url"
          />
          <!-- :src="props.character.image.webUrl" -->
        </div>
        <div class="pl-2">
          <div style="width: 30vw">
            <strong>Date:</strong> {{ character.book.pq_year_early }}
          </div>

          <div style="width: 30vw" class="mt-2">
            <strong>Printer:</strong> {{ character.book.pp_printer }}
          </div>

          <div style="width: 30vw" class="mt-2">
            <strong>Source Book:</strong> {{ character.book.estc }}
          </div>

          <div style="width: 30vw" class="mt-2">
            <strong>Character Coordinate:</strong>
            <div class="pl-5">
              x: {{ character.x_min }}<br/>
              y: {{ character.y_min }}<br/>
              w: {{ character.x_max - character.x_min }}<br/>
              h: {{ character.y_max - character.y_min }}<br/>
            </div>
          </div>

          <div style="width: 30vw" class="mt-2">
            <strong>Cite As</strong>: {{ character.cite_as }}
          </div>
        </div>
      </div>

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
// Resoures
const {$axios} = useNuxtApp();

// Route
const route = useRoute();

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
        // character_class: character.value['character_class'],
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

// Head
useHead({titleTemplate: `Character: ${character.value.label} - %s`});
</script>
