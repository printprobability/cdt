<template>

    <v-container>

        <h1>{{ title }}</h1>

        <slot name="intro"></slot>

        <hr />

        <v-row>

            <v-col cols="3">
                <h3>Filter</h3>
                <v-form>
                    <slot name="filter"></slot>
                </v-form>
            </v-col>

            <v-col cols="9">
                <h3>{{ result_count_string }}</h3>
                <v-pagination
                    :disabled="total_rows <= page_size"
                    :per-page="page_size"
                    :total-rows="total_rows"
                    :value="value"
                    @input="$emit('input', $event)"
                    align="center"></v-pagination>
                <slot name="results"></slot>
                <!-- <v-pagination
                    :disabled="total_rows <= page_size"
                    :per-page="page_size"
                    :total-rows="total_rows"
                    :value="value"
                    @input="$emit('input', $event)"
                    align="center"></v-pagination> -->
            </v-col>

        </v-row>

        <slot name="foot"></slot>

    </v-container>

</template>
  
<script>

export default {

    props: {

        intro: String,
        page_size: Number,
        results_string: String,
        title: String,
        total_rows: Number,
        value: Number
    },

    computed: {

        result_count_string() {

            if ( this.total_rows > 1 ) {

                return `${this.total_rows} results`;
            } else if ( this.total_rows == 1 ) {

                return "1 result";
            }

            return "No results";
        },
    },
};
</script>