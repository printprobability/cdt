<template>

  <div>
    <InterfaceList title="Search books" v-model="page" :total_rows="booksCount" :page_size="page_size">
      <h1>Book list</h1>

      <!--      <template #intro>-->
      <!--        <p style="margin-top: 1em; margin-bottom: 1em;">{{ $siteConfig.browsecopy.books }}</p>-->
      <!--      </template>-->

      <!--      <template #filter>-->
      <!--        <v-text-field-->
      <!--          id="input-book-title"-->
      <!--          debounce="500"-->
      <!--          label="Title"-->
      <!--          placeholder="Aeropagitica"-->
      <!--          v-model="form.title"/>-->
      <!--        <v-text-field-->
      <!--          id="input-book-printer"-->
      <!--          debounce="500"-->
      <!--          label="Printer"-->
      <!--          placeholder="Evan Tyler"-->
      <!--          v-model="form.printer"/>-->

      <!--        <DateSlider-->
      <!--          :minYear="1600"-->
      <!--          :maxYear="1800"-->
      <!--          @update:modelValue="changeDate"/>-->
      <!--      </template>-->

      <!--      <template #results>-->
      <!--        <v-pagination :length="numPages" v-model="page"></v-pagination>-->
      <!--        <v-list v-if="books || books.length > 0">-->
      <!--          <v-list-item v-for="book in paginationBooks" :key="book.id">-->
      <!--            <BookCard v-if="book.coverPage.image.thumbnail" :book="book" :characters="getBookCharacters(book.id)"/>-->
      <!--          </v-list-item>-->
      <!--        </v-list>-->
      <!--        <v-pagination :length="numPages" v-model="page"></v-pagination>-->
      <!--      </template>-->

      <!--      <template #footer></template>-->
    </InterfaceList>
  </div>

</template>

<script setup>

// import _ from "lodash";
// import {computed, reactive, ref, watch} from "vue";
//
// // Head
// useHead({titleTemplate: "Book Search - %s"});
//
// // Data
// var all_books = ref([]);
// var books = ref([]);
// var date = reactive([1600, 1800]);
// const form = reactive({
//
//   title: "",
//   printer: "",
//   year_min: 1600,
//   year_max: 1800
// });
// var page = ref(1);
// var page_size = ref(5);
// const {$siteConfig} = useNuxtApp();
// var characters = reactive([]);
//
// // Computed
// const booksCount = computed(() => {
//
//   return all_books.value.length;
// });
// const numPages = computed(() => {
//
//   return Math.ceil(all_books.value.length / page_size.value);
// });
// const paginationBooks = computed(() => {
//
//   const start = (page.value - 1) * page_size.value;
//   const end = start + page_size.value;
//
//   return all_books.value.slice(start, end);
// });
//
// // Async data
// ({data: characters} = await useAsyncData("myCharacters", () => queryContent("characters")
//   .only([])
//   .find()
// ));
//
// var refreshFilteredBooks, refreshAllBooks;
// ({
//   data: books,
//   refresh: refreshFilteredBooks
// } = await useAsyncData("bookIndex_filteredbooks", () => queryContent("books")
//   .only([
//     "id",
//     "pqTitle",
//     "pqPublisher",
//     "pqYearEarly",
//     "pqYearLate",
//     "coverPage"
//   ])
//   .where({
//     $and: [{
//       pqTitle: {$regex: new RegExp(form.title, "i")},
//       ppPublisher: {$regex: new RegExp(form.printer, "i")},
//       pqYearEarly: {$gte: form.year_min},
//       pqYearLate: {$lte: form.year_max}
//     }]
//   })
//   .limit(page_size)
//   .skip((page - 1) * page_size)
//   .find()
// ));
//
// ({data: all_books, refresh: refreshAllBooks} = await useAsyncData("bookIndex_allbooks", () => queryContent("books")
//   .only([])
//   .where({
//     $and: [{
//       pqTitle: {$regex: new RegExp(form.title, "i")},
//       ppPublisher: {$regex: new RegExp(form.printer, "i")},
//       pqYearEarly: {$gte: form.year_min},
//       pqYearLate: {$lte: form.year_max}
//     }]
//   })
//   .find()
// ));
//
// // Methods
// function changeDate(p_newDate) {
//
//   date[0] = p_newDate[0];
//   date[1] = p_newDate[1];
// }
//
// function getBookCharacters(p_bookID) {
//
//   return characters.value.filter(({book}) => p_bookID === book);
// }
//
// function refreshData() {
//
//   refreshFilteredBooks();
//   refreshAllBooks();
// }
//
// // Watchers
// watch(form, (p_newValue, p_oldValue) => {
//
//   page.value = 1;
//   refreshData();
// });
// watch(date, _.debounce(() => {
//
//   // NOTE: For multiple ways to debounce in Vue 3 using lodash debounce:
//   // https://codecourse.com/articles/debounce-input-in-vue-3
//
//   form.year_min = date[0];
//   form.year_max = date[1];
// }, 500));

</script>
