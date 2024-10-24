<template>
  <div class="osd" :id/>
</template>

<script setup>
import OpenSeadragon from "openseadragon";
import {nextTick} from "vue";

// Get resource
const {$axios} = useNuxtApp();
const runtimeConfig = useRuntimeConfig()

// Props
const props = defineProps({
  id: String,
  src: String,
  overlay: Object
});

// Image info
const imageInfo = ref(null);
// Image info Url for OSD
const imageInfoUrl = computed(() => {
  // Split src by / and remove last 4 segments
  const segment = props.src.split('/').slice(0, -4);
  // Push info.json
  segment.push('info.json');

  return segment.join('/');
})

// OSD options
const options = computed(() => {
  return {
    id: props.id,
    maxZoomLevel: 3,
    overlays: overlays.value,
    prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@5.0/build/openseadragon/images/",
    tileSources: [imageInfo.value],
  };
});
// OSD overlay options
const overlays = computed(() => [
  // {
  //   id: "overlay" + props.id + "vlinetop",
  //   px: props.overlay.x,
  //   py: 0,
  //   width: props.overlay.w,
  //   height: props.overlay.y,
  //   className: "crosshair",
  // },
  // {
  //   id: "overlay" + props.id + "hlineright",
  //   px: 0,
  //   py: props.overlay.y,
  //   width: props.overlay.x,
  //   height: props.overlay.h,
  //   className: "crosshair",
  // },
  {
    id: "overlay" + props.id,
    px: props.overlay.x,
    py: props.overlay.y,
    width: props.overlay.w,
    height: props.overlay.h,
    className: 'overlay',
  }
]);

// Get image info and initiate OSD
onMounted( () => {
  $axios.get(imageInfoUrl.value, {withCredentials: true}).then(res => {
    // Get image info
    imageInfo.value = res.data;
    // Fix link in @id
    imageInfo.value['@id'] = imageInfo.value['@id'].replace(
      runtimeConfig.public.IIIF_HOST,
      runtimeConfig.public.APP_ENV === 'production'
        ? `${runtimeConfig.public.IIIF_HOST}/iiif/`
        : `${runtimeConfig.public.API_BASE_URL}/iiif/`
    );
    // Init OSD
    nextTick(() => OpenSeadragon(options.value));
  })
});
</script>


<style lang="scss">
.crosshair {
  background: gray;
  opacity: 50%;
}

.osd {
  height: 400px;
  min-width: 100%;
}

.overlay {
  outline: red 3px solid;

  &:hover {
    outline: red 3px solid;
  }
}
</style>
