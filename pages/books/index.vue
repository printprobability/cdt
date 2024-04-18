<template>

    <div>
        <InterfaceList title="Search books" v-model="page" :total_rows="books_count" :page_size="page_size">

            <template #intro>
                <p style="margin-top: 1em; margin-bottom: 1em;">{{ $siteConfig.browsecopy.books }}</p>
            </template>

            <template #filter>
                <v-text-field
                    id="input-book-title"
                    debounce="500"
                    label="Title"
                    placeholder="Aeropagitica"
                    v-model="form.title" />
                <v-text-field
                    id="input-book-printer"
                    debounce="500"
                    label="Printer"
                    placeholder="Evan Tyler"
                    v-model="form.printer" />
                
                <!-- v-model:modelValue="date" -->
                <DateSlider
                    :minYear="1600"
                    :maxYear="1800"
                    @update:modelValue="changeDate" />
            </template>

            <template #results>
                <v-list v-if="books || books.length > 0">
                    <v-list-item v-for="book in books" :key="book.id">
                        <BookCard v-if="book.coverPage.image.thumbnail" :book="book" />
                    </v-list-item>
                </v-list>
            </template>

            <template #footer></template>
        </InterfaceList>
    </div>

</template>

<script setup>

import _ from "lodash";
import { computed, reactive, ref, watch } from "vue";

// Head
useHead({ titleTemplate: "Book Search - %s" });

// Data
var all_books = ref([]);
var books = ref([]);
var date = reactive([1600, 1800]);
const form = reactive({
    
    // title: ".+",
    // printer: ".+",
    title: "",
    printer: "",
    year_min: 1600,
    year_max: 1800  
});
var page = ref(1);
var page_size = ref(5);
const { $siteConfig } = useNuxtApp();

// Computed
const books_count = computed(() => {

    return all_books.value.length;
});
const query = computed(() => {

    return [{
        pqTitle: { $regex: new RegExp(( "" === form.title ) ? ".+" : form.title, "i") },
        ppPublisher: { $regex: new RegExp(( "" === form.printer ) ? ".+" : form.printer, "i") },
        pqYearEarly: { $gte: form.year_min },
        pqYearLate: { $lte: form.year_max }
    }];
});

// Async data
var refreshFilteredBooks, refreshAllBooks;
({ data: books, refresh: refreshFilteredBooks } = await useAsyncData("bookIndex_filteredbooks", () => queryContent("books")
    .only([
        "id",
        "pqTitle",
        "pqPublisher",
        "pqYearEarly",
        "pqYearLate",
        "coverPage"
    ])
    .where({ 
        $and: [{
            pqTitle: { $regex: new RegExp(form.title, "i") },
            ppPublisher: { $regex: new RegExp(form.printer, "i") },
            pqYearEarly: { $gte: form.year_min },
            pqYearLate: { $lte: form.year_max }
        }]
        // $and: query
    })
    .limit(page_size)
    .skip((page - 1) * page_size)
    .find()
));

({ data: all_books, refresh: refreshAllBooks } = await useAsyncData("bookIndex_allbooks", () => queryContent("books")
    .only([])
    //.where({ $and: query })
    .where({ $and: [{
            pqTitle: { $regex: new RegExp(form.title, "i") },
            ppPublisher: { $regex: new RegExp(form.printer, "i") },
            pqYearEarly: { $gte: form.year_min },
            pqYearLate: { $lte: form.year_max }
        }]
    })
    .find()
));

// Methods

function changeDate(p_newDate) {

    console.log(`changeDate with ${p_newDate}`);

    date[0] = p_newDate[0];
    date[1] = p_newDate[1];
}
function refreshData() {

    refreshFilteredBooks();
    refreshAllBooks();
}

// Watchers
watch(form, (p_newValue, p_oldValue) => {

    page = 1;
    refreshData();
});
watch(page, (p_newValue, p_oldValue) => {

    refreshData();
});
watch(date, (p_newValue, p_oldValue) => {

    console.log(`Date changed p_newValue: ${p_newValue} p_oldValue: ${p_oldValue}`);

    // _.debounce(() => {

    //     console.log("Debounce!");

    //     form.year_min = date[0];
    //     form.year_max = date[1];        
    // }, 750);

    setTimeout(() => {

        console.log("setTimeOut done!");
        
        form.year_min = date[0];
        form.year_max = date[1];
    }, 750);    
});

</script>