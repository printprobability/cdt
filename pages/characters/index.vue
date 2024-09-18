<template>
  <InterfaceList
    title="Browse Characters"
    v-model="page"
    :total_rows="charactersCount"
    :page_size="page_size"
  >
    <template #intro>
      <p>{{ $siteConfig.browsecopy.characters }}</p>
    </template>

    <template #filter>
      <TextField label="Printer (Last name)"></TextField>
      <YearSlider
        v-model="yearRange"
        :min="MIN_YEAR"
        :max="MAX_YEAR"
      ></YearSlider>
      <MenusCharacterClassSelect v-model="characterClass" />
      <v-divider />
    </template>

    <template #results>
      <!-- <v-list v-if="characters || characters.length > 0">
        <div class="d-flex flex-wrap">
          <v-list-item
            v-for="character in paginationCharacters"
            :key="character.id"
          >
            <CharacterImage :character="character" :key="character.id" />
          </v-list-item>
        </div>
      </v-list> -->
      <CharacterImage :character="character" :key="character.id" />

      <v-pagination :length="numPages" v-model="page"></v-pagination>
    </template>
  </InterfaceList>
</template>

<script setup>
import _ from "lodash";
import { reactive, ref, watch } from "vue";

// ********************************
// Config
// ********************************
const MIN_YEAR = 1600;
const MAX_YEAR = 1800;

// ********************************
// Filter data
// ********************************
// Year range
const yearRange = ref({ yearEarly: MIN_YEAR, yearLate: MAX_YEAR });
// Character class
const characterClass = ref("");
// Head
useHead({ titleTemplate: "Character Search - %s" });
</script>
