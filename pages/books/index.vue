<template>

    <InterfaceList
        :total_rows="books_count"
        :page_size="page_size"
        title="Search books"
        v-model="page">

        <template #intro>
            <p>{{ $siteConfig.browsecopy.books }}</p>
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
            <ClientOnly>
                <DateSlider v-model="date" />
            </ClientOnly>
        </template>

        <template #results>
            <v-list v-if="books.length > 0">
                <v-list-item v-for="book in books" :key="book.id">
                    <BookCard :book="book" />
                </v-list-item>
            </v-list>
        </template>

    </InterfaceList>

</template>
  
<script>

import _ from "lodash";

export default {

    components: {

        DateSlider: () => import("~/client-components/DateSlider.vue"),
    },

    head: {

        titleTemplate: "Book Search - %s",
    },

    data() {

        return {

            form: {

                title: "",
                printer: "",
                year_min: 1600,
                year_max: 1800,
            },

            page: 1,
            date: [1600, 1800], // This var gets debounced on its way to updating the dates in the form
            books: [],
            books_count: 0,
            page_size: 5,
        };
    },

    async fetch() {

        this.books = await this.$content("books")
            .only([
                "id",
                "pqTitle",
                "pqPublisher",
                "pqYearEarly",
                "pqYearLate",
                "coverPage",
            ])
            .where({ $and: this.query })
            .limit(this.page_size)
            .skip((this.page - 1) * this.page_size)
            .fetch();

        const all_books = await this.$content("books")
            .only([])
            .where({ $and: this.query })
            .fetch();
        this.books_count = all_books.length;
    },

    watch: {

        date: _.debounce(function () {
            this.form.year_min = this.date[0];
            this.form.year_max = this.date[1];
        }, 750),        

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
    },

    computed: {

        query() {

            return [
                { pqTitle: { $regex: [this.form.title, "i"] } },
                { ppPublisher: { $regex: [this.form.printer, "i"] } },
                { pqYearEarly: { $gte: this.form.year_min } },
                { pqYearLate: { $lte: this.form.year_max } },
            ];
        },
    }
};

</script>