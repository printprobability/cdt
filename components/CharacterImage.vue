<template>

    <div class="m-1 character-box">

        <NuxtLink :to="{ name: 'characters-id', params: { id: character.id } }">
            <v-img :class="{
                'charachter-image': true,
                border: selected,
                'border-primary': selected,
                'border-5': selected,
            }" :id="character.id" :src="character.image.webUrl" :alt="character.label" :height="90"
                @mouseover="$emit('hover', $event)" />
        </NuxtLink>

        <!-- TO BE RE-IMPLEMENTED -->
        <v-popover :target="character.id" triggers="hover" placement="top" :delay="pop_delay">
            <template #title>
                <NuxtLink :to="{ name: 'characters-id', params: { id: character.id } }">
                    {{ character.label }}
                </NuxtLink>
            </template>
            <CharacterCard :character="character" />
        </v-popover>

    </div>

</template>
  
<script>
export default {
    props: {
        character: Object,
        selected: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            pop_delay: { show: 400, hide: 200 },
        };
    },
};
</script>
  
<style scoped>
.character-box {
    width: 100px;
    height: 100px;
}

.character-image {
    max-width: 100px;
    max-height: 100px;
    height: 100px;
}
</style>