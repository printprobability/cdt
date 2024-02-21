<template>

    <div :id="id" class="osd"></div>

</template>
  
<script>

import OpenSeadragon from "OpenSeadragon";

export default {

    props: {

        id: String,
        image_info_url: String,
        overlay: Object,
    },

    data() {

        return {

            image_info_data: null,
        };
    },

    computed: {

        options() {

            return {

                id: this.id,
                maxZoomLevel: 3,
                overlays: this.overlays,
                prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@3.0/build/openseadragon/images/",
                tileSources: [this.image_info_url]
            };
        },

        overlays() {

            return [
                {
                    id: "overlay" + this.id + "vlinetop",
                    px: this.overlay.x,
                    py: 0,
                    width: this.overlay.w,
                    height: this.overlay.y,
                    className: "crosshair",
                },
                {
                    id: "overlay" + this.id + "hlineright",
                    px: 0,
                    py: this.overlay.y,
                    width: this.overlay.x,
                    height: this.overlay.h,
                    className: "crosshair",
                },
                {
                    id: "overlay" + this.id,
                    px: this.overlay.x,
                    py: this.overlay.y,
                    width: this.overlay.w,
                    height: this.overlay.h,
                    className: "overlay",
                },
            ];
        },
    },

    mounted() {

        if ( process.client ) {

            OpenSeadragon(this.options);
        }
    },
};
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
  