<template>

    <div>
        <v-select
            id="input-character-book"
            :debounce="500"
            :options="all_books"
            :value="value"
            @input="$emit('input', $event)"
            label="Book" />
    </div>

</template>
  
<script>

const ANY_BOOK = {
    
    text: "any",
    value: "any"
};

export default {

    props: {

        value: {

            type: String,
            default: "any",
        }
    },

    data() {

        return {

            all_books: []
        };
    },

    async fetch() {

        const fetched_books = await useFetch(() => queryContent("books")
            .sortBy("pqTitle")
            .only(["id", "label"])
        );            

        this.all_books = fetched_books.map((book) => {

            return {

                text: book.label,
                value: book.id,
            };
        });
        this.all_books.unshift(ANY_BOOK);
    },

    created() {

        this.$fetch();
    }
};

</script>