<template>

    <ClientOnly>
        <vue-slider
            ref="slider"
            id="input-book-date"
            :data-label="Date"
            :enable-cross="false"
            :min="1600"
            :max="1800"
            :value="value"
            @change="$emit('input', $event)"
            tooltip="always"
            tooltipPlacement="bottom" />
    </ClientOnly>

</template>
  
<script>

import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default {

    components: {
    
        VueSlider
    },

    props: {

        value: Array,
    }
};

</script>
  