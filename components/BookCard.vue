<template>

    <VMedia imageAlt="" imageSrc="">

        <template #image>
            <PageImage :page="book.coverPage" />
        </template>

        <template #content>
            <p>
                <NuxtLink :to="book_link">
                    <i>{{ book.pqTitle }}</i>
                </NuxtLink>
            </p>

            <p>Published: {{ edtf }}</p>
            <p v-if="book.ppPublisher">Printed by: {{ book.ppPublisher }}</p>
            <p>
                <NuxtLink :to="book_link">{{ n_chars }}</NuxtLink>
            </p>
        </template>
    </VMedia>

</template>
  
<script>

export default {

    props: {

        book: Object,
    },

    data() {

        return {

            characters: [],
        };
    },

    async fetch() {

        this.characters = await this.$content("characters")
            .where({ book: { $eq: this.book.id } })
            .only([])
            .fetch();
    },

    computed: {

        book_link() {

            return {

                name: "books-id",
                params: {
                    id: this.book.id
                }
            };
        },

        edtf() {

            return ( this.book.pqYearEarly == this.book.pqYearLate ) ? 
                this.book.pqYearEarly : 
                `${this.book.pqYearEarly}/${this.book.pqYearLate}`;
        },

        n_chars() {

            return ( this.characters.length > 1 ) ? 
                `${this.characters.length} characters` :
                "1 character";
        }   
    }
};

</script>
  