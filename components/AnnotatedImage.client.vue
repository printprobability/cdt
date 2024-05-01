<template>
    <div class="osd" :id="id"></div>
</template>

<script setup>
    
    import { OpenSeadragon } from "OpenSeadragon";

    // Props
    const props = defineProps({

        id: String,
        image_info_url: String,
        overlay: Object        
    });

    // Data
    const image_info_data = ref(null);

    // Computed

    const options = computed(() => {
        
        return {

            id: props.id,
            maxZoomLevel: 3,
            overlays: overlays,
            prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@3.0/build/openseadragon/images/",
            tileSources: [props.image_info_url]
        };        
    });
    const overlays = computed(() => {

        return [
        {
            id: "overlay" + props.id + "vlinetop",
            px: props.overlay.x,
            py: 0,
            width: props.overlay.w,
            height: props.overlay.y,
            className: "crosshair",
        },
        {
            id: "overlay" + props.id + "hlineright",
            px: 0,
            py: props.overlay.y,
            width: props.overlay.x,
            height: props.overlay.h,
            className: "crosshair",
        },
        {
            id: "overlay" + props.id,
            px: props.overlay.x,
            py: props.overlay.y,
            width: props.overlay.w,
            height: props.overlay.h,
            className: "overlay",
        }];
    });

    onMounted(() => {

        if ( process.client ) {
            OpenSeadragon(this.options);
        }
    });
</script>
  
  
<style>

    .crosshair {

        background: gray;
        opacity: 50%;
    }

    .osd {

        height: 750px;
        min-width: 100%;
    }

    .overlay {

        outline: red 5px solid;
    }

</style>
