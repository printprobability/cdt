<template>

  <v-container>
    <h1>Printer detail</h1>

<!--    <h1 class="dldt-text-h1">{{ book[0].pqTitle }}</h1>-->

<!--    <v-card border="sm" flat>-->
<!--      <v-card-text>-->
<!--        <p>-->
<!--          Identifiers:-->
<!--          <v-table>-->
<!--            <tbody>-->
<!--            <tr>-->
<!--              <td>-->
<!--                ESTC:&nbsp;-->
<!--                <span v-if="book[0].estc">{{ book[0].estc }}</span>-->
<!--                <span v-else>{{ notAvailableString }}</span>-->
<!--              </td>-->
<!--              <td>-->
<!--                VID:&nbsp;-->
<!--                <span v-if="book[0].vid">{{ book[0].vid }}</span>-->
<!--                <span v-else>{{ notAvailableString }}</span>-->
<!--              </td>-->
<!--              <td>-->
<!--                EEBO:&nbsp;-->
<!--                <span v-if="book[0].eebo">{{ book[0].eebo }}</span>-->
<!--                <span v-else>{{ notAvailableString }}</span>-->
<!--              </td>-->
<!--              <td>-->
<!--                TCP:&nbsp;-->
<!--                <span v-if="book[0].tcp">{{ book[0].tcp }}</span>-->
<!--                <span v-else>{{ notAvailableString }}</span>-->
<!--              </td>-->
<!--            </tr>-->
<!--            </tbody>-->
<!--          </v-table>-->
<!--        </p>-->

<!--        <p>Author:&nbsp;-->
<!--          <span v-if="book[0].pqAuthor">{{ book[0].pqAuthor }}</span>-->
<!--          <span v-else>{{ notAvailableString }}</span>-->
<!--        </p>-->
<!--        <p>Printer:&nbsp;-->
<!--          <span v-if="book[0].colloqPrinter">{{ book[0].colloqPrinter }}</span>-->
<!--          <span v-else>{{ notAvailableString }}</span>-->
<!--        </p>-->
<!--        <p>Notes:&nbsp;-->
<!--          <span v-if="book[0].ppNotes">{{ book[0].ppNotes }}</span>-->
<!--          <span v-else>{{ notAvailableString }}</span>-->
<!--        </p>-->
<!--      </v-card-text>-->
<!--    </v-card>-->

<!--    <h2>Noteworthy characters</h2>-->

<!--    <v-card border="sm" flat>-->

<!--      <v-tabs v-model="tab">-->
<!--        <v-tab value="one">Group by page</v-tab>-->
<!--        <v-tab value="two">Group by character class</v-tab>-->
<!--        <v-tab value="three">JSON</v-tab>-->
<!--      </v-tabs>-->

<!--      <v-card-text>-->
<!--        <v-window v-model="tab">-->
<!--          <v-window-item class="noteworthy_tab" :transition="false" value="one">-->

<!--            <v-pagination :length="pagesCount" v-model="index"></v-pagination>-->

<!--            <VMedia :title="`p. ${currentPage.sequence}`">-->
<!--              <template #image>-->
<!--                <PageImage :page="currentPage"/>-->
<!--              </template>-->
<!--              <template #content>-->
<!--                <div class="d-flex flex-wrap">-->
<!--                  <CharacterImage v-for="character in pageCharacters(currentPage.id)"-->
<!--                                  :key="character.id" :character="character"/>-->
<!--                </div>-->
<!--              </template>-->
<!--            </VMedia>-->

<!--            <v-pagination :length="pagesCount" v-model="index"></v-pagination>-->

<!--          </v-window-item>-->

<!--          <v-window-item class="noteworthy_tab" :transition="false" value="two">-->

<!--            <MenusCharacterSelect-->
<!--              :allow_any="false"-->
<!--              :selectedCharacterFromParent="{ classname: selectedCharacterClass, label: selectedCharacterLabel }"-->
<!--              :where="classFilter"-->
<!--              @updateCharacterClass="setSelectedCharacterClass"/>-->
<!--            <div class="d-flex flex-wrap">-->
<!--              <CharacterImage v-for="character in classCharacters"-->
<!--                              :key="character.id" :character="character"/>-->
<!--            </div>-->
<!--          </v-window-item>-->

<!--          <v-window-item class="noteworthy_tab" :transition="false" value="three">-->
<!--            &lt;!&ndash; <InterfaceJSONButton :href="`/books/${book[0].id}.json`" /> &ndash;&gt;-->
<!--            <pre>{{ formattedBookJSON }}</pre>-->
<!--          </v-window-item>-->
<!--        </v-window>-->
<!--      </v-card-text>-->
<!--    </v-card>-->
  </v-container>

</template>

<script setup>

// import _ from "lodash";
// import {reactive, ref} from "vue";
//
// const route = useRoute();
//
// // Data
// const index = ref(1);
// const notAvailableString = ref("N/A");
// const pages = reactive([]);
// const selectedCharacterClass = ref("a_lc");
// const selectedCharacterLabel = ref("a");
// const tab = ref(null);
//
// // Async data
// const {data: book} = await useAsyncData("myBooks", () => queryContent("books", route.params.id).find());
// const {data: characterClasses} = await useAsyncData("myCharacterClasses", () => queryContent("classes").find());
// const {data: characters} = await useAsyncData("myCharacters", () => queryContent("characters")
//   .where({book: route.params.id})
//   .only(["id", "page", "label", "image", "characterClass"])
//   .sort({"page.sequence": 1, $numeric: true})
//   .find()
// );
//
// // Get list of uniquely ID'd page objects
// const allPages = characters.value.map((c) => c.page);
// pages.value = (characters.value.length > 0) ? _.sortedUniqBy(allPages, (p) => p.id) : [];
//
// // Head
// useHead({titleTemplate: `Book: ${book.value[0].pqTitle} - %s`});
//
// // Methods
// function pageCharacters(p_page_id) {
//
//   return characters.value.filter((c) => c.page.id === p_page_id);
// }
//
// function setSelectedCharacterClass(p_newCharacterObject) {
//
//   selectedCharacterLabel.value = p_newCharacterObject.id;
//   selectedCharacterClass.value = p_newCharacterObject.name;
// }
//
// // Computed
// const classCharacters = computed(() => {
//
//   return characters.value.filter((c) => c.characterClass === selectedCharacterClass.value);
// });
// const classFilter = computed(() => {
//
//   return {classname: {$in: _.uniq(characters.value.map((c) => c.characterClass))}};
// });
// const currentPage = computed(() => {
//
//   return (pages.value.length > 0) ? pages.value[index.value - 1] : {};
// });
// const formattedBookJSON = computed(() => {
//
//   return JSON.stringify(book.value[0], customReplacer, 4);
// });
// const pagesCount = computed(() => pages.value.length);
//
// // Methods
//
// function customReplacer(key, value) {
//
//   // List of keys to ignore (e.g., 'privateProperty1', 'privateProperty2')
//   const keysToIgnore = [
//     "_path",
//     "_dir",
//     "_draft",
//     "_partial",
//     "_locale",
//     "_id",
//     "_type",
//     "title",
//     "_source",
//     "_file",
//     "_extension"
//   ];
//
//   // Omit the key from the output
//   if (keysToIgnore.includes(key)) {
//
//     return undefined;
//   }
//
//   // Include other keys
//   return value;
// }

</script>


<style scoped>

.hide {

  /* Hide the numbered display buttons */
  display: none;
}

.noteworthy_tab {

  transition: none !important;
  transform: none !important;
}

table, td {

  border: 1px solid lightgray;
}
</style>
