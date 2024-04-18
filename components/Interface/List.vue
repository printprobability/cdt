<template>
    
    <v-container>
        
        <p class="page-title">{{ props.title }}</p>

        <slot name="intro"></slot>

        <hr />
        
        <v-row>
            
            <v-col cols="3">
                <p class="page-header">Filter</p>
                <v-form>
                    <slot name="filter"></slot>
                </v-form>
            </v-col>
            
            <v-col cols="9">
                <p class="page-header">{{ result_count_string }}</p>

                <!-- <v-pagination
                    :disabled="props.total_rows <= props.page_size"
                    :length="props.page_size"
                    :total-rows="props.total_rows"
                    :value="props.value"
                    align="center"
                    @input="$emit('input', $event)"></v-pagination> -->
                <slot name="results"></slot>
                <!-- <v-pagination
                    :disabled="props.total_rows <= props.page_size"
                    :length="props.page_size"
                    :total-rows="props.total_rows"
                    :value="props.value"
                    align="center"
                    @input="$emit('input', $event)"></v-pagination> -->
            </v-col>
        </v-row> 

        <slot name="foot"></slot>

    </v-container>
</template>

<script setup>

    const props = defineProps({
        
        intro: String,
        page_size: Number,
        results_string: String,
        title: String,
        total_rows: Number,
        value: Number
    });

    const result_count_string = computed(() => {

        if ( props.total_rows > 1 ) {

            return `${props.total_rows} results`;
        } else if ( props.total_rows == 1 ) {

            return "1 result";
        } else {

            return "No results";
        }
    });

</script>

<style>

    .page-header {

        font-family: "Vollkorn";
        font-size: 1.5em;
        font-weight: 600;
        color: #b00;
    }

    .page-title {

        font-family: "Cinzel";
        font-size: 2.5em;
        font-weight: 500;
        color: #b00;
    }   

</style>
