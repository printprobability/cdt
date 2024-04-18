<template>

    <ClientOnly>
        <!-- <vue-slider
            ref="slider"
            id="input-book-date"
            :data-label="Date"
            :enable-cross="false"
            :min="1600"
            :max="1800"
            :value="value"
            @change="$emit('input', $event)"
            tooltip="always"
            tooltipPlacement="bottom" /> -->

        <v-range-slider
            ref="slider"
            id="input-book-date"
            :v-model="value"
            :label="Date"
            :min="1600"
            :max="1800"
            @change="$emit('input', $event)">
            
            <v-tooltip
                activator="parent"
                location="bottom">"always"</v-tooltip>
        </v-range-slider>
    </ClientOnly>

</template>
  
<script>

export default {

    props: {

        value: Array,
    }
};

</script>
  