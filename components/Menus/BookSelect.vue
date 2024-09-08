<template>

    <div>
        {{ selectLabel }}

        <v-select
            :items="allBooks"
            v-model="selectedOption"
            item-title="text"
            item-value="value"
            @update:modelValue="$emit('updateBookSelection', selectedOption.value)"
            return-object></v-select>
    </div>

</template>
  
<script setup>

    import { reactive, ref } from "vue";

    // Emits
    const emit = defineEmits(["updateBookSelection"]);    

    // Data
    const ANY_BOOK = reactive({
        
        text: "any",
        value: "any"
    });
    const selectLabel = ref("Book");
    

    // Async data
    const { data: fetchedBooks } = await useAsyncData("fetchedBooks", () => queryContent("books")
        .sort({ "pqTitle": 1 })
        .only(["id", "label"])
        .find()
    );

    const allBooks = fetchedBooks.value.map(book => {
        
        return {
        
            text: book.label,
            value: book.id
        };
    });
    // allBooks.unshift(ANY_BOOK);

    // Initial selected option is the first book
    var selectedOption = reactive({

        text: allBooks[0].text,
        value: allBooks[0].value
    });

</script>