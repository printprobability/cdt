<template>

    <InterfaceList
        :total_rows="all_books.length"
        :page_size="page_size"
        title="Search books"
        v-model="page">

        <template #intro>
            <p>{{ $siteConfig.browsecopy.books }}</p>
        </template>

        <template #filter>
            <v-text-field id="input-book-title" debounce="500" label="Title" placeholder="Aeropagitica" v-model="form.title" />
            <v-text-field id="input-book-printer" debounce="500" label="Printer" placeholder="    Evan Tyler" v-model="form.printer" />
            <ClientOnly>
                <!-- <DateSlider v-model="date" /> -->
            </ClientOnly>
        </template>

        <template #results>
            <v-list v-if="filtered_books.length > 0">
                <v-list-item v-for="book in filtered_books" :key="book.id">
                    <BookCard :book="book" />
                </v-list-item>
            </v-list>
        </template>
    </InterfaceList>
</template>

<script>

    useHead({ titleTemplate: "Book Search - %s" });

    defineProps({

        all_books: Array,
        filtered_books: Array
    });

</script>

<script>
    // NOTE: 3/1/2024 - Provide earlier version of the JS section below to see if Matt's initial
    // version can be tweaked with new Nuxt fetch commands
    // Also - replace this.$fetch instances with...$fetch ? See documentation.

    import _ from "lodash";

    export default {

        async setup() {

            useHead({ titleTemplate: "Book Search - %s" });

            const page = ref(1);
            const page_size = ref(5);
            const year_min = ref(1600);
            const year_max = r ef(1800);

            // This var gets debounced on its way to updating the dates in the form
            const date = reactive([year_min, year_max]);

            const form = reactive({
                
                title: "",
                printer: "",
                year_min: year_min,
                year_max: year_max,
            });

            const query = computed(() => [{
                    pqTitle: {
                        $regex: [form.title, "i"]
                    }
                },
                {
                    ppPublisher: {
                        $regex: [form.printer, "i"]
                    }
                },
                {
                    pqYearEarly: {
                        $gte: form.year_min
                    }
                },
                {
                    pqYearLate: {
                        $lte: form.year_max
                    }
                },
            ]);

            const books = reactive(
                await useAsyncData("books", () =>
                    queryContent("books")
                    .only([
                        "id",
                        "pqTitle",
                        "pqPublisher",
                        "pqYearEarly",
                        "pqYearLate",
                        "coverPage",
                    ])
                    .where({
                        $and: query
                    })
                    .limit(page_size)
                    .skip((page - 1) * page_size)
                )
            );

            const all_books = reactive(
                await useAsyncData("books", () =>
                    queryContent("books").only([]).where({
                        $and: query
                    })
                )
            );

            return {
                all_books,
                books,
                date,
                form,
                page,
                page_size,
                query,
                year_max,
                year_min,
            };
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

                    // Opportunity for refresh call
                    this.$fetch();
                },
                deep: true,
            },

            page() {
                // Opportunity for refresh call
                this.$fetch();
            },
        },
    };
</script>
