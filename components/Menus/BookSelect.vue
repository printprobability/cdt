<template>

    <div>
        <v-select
            :options="all_books"
            :value="props.value"        
            id="input-character-book"
            debounce="500"
            label="Book"
            @input="$emit('input', $event)"/>
    </div>

</template>
  
<script setup>

    import { reactive } from "vue";

    // Props
    const props = defineProps({

        value: { default: "any", type: String }
    });

    // Data
    const all_books = reactive([]);
    const ANY_BOOK = reactive({
        
        text: "any",
        value: "any"
    });
    const { data: fetched_books, refresh: refreshFetchedBooks } = await useAsyncData("fetchedBooks", () => queryContent("books")
        .sortBy("pqTitle")
        .only(["id", "label"])
        .find()
    );

    

    // Methods
    function refreshData() {

        refreshFetchedBooks();
        all_books = fetched_books.map((book) => {

            return {
                
                text: book.label,
                value: book.id
            };
        });
        all_books.unshift(ANY_BOOK);
    }

</script>