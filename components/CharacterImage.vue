<template>
    <div class="m-1 character-box">

        <NuxtLink :to="{ name: 'characters-id', params: { id: props.character.id } }">

            <!-- Will be lazy loaded -->
            <v-img
                :class="{
                    'character-image': true,
                    'border': selected,
                    'border-primary': selected,
                    'border-5': selected,
                }"
                :id="props.character.id"
                :src="props.character.image.webUrl"
                :alt="props.character.label"
                height="90"
                @mouseover="$emit('hover', $event)"></v-img>

        </NuxtLink>

        <!-- Mimics b-popover -->
        <v-menu open-on-hover>
            <v-list>
                <v-list-item :to="{ name: 'characters-id', params: { id: props.character.id } }">
                    <v-list-item-title>{{ props.character.label }}</v-list-item-title>
                    <CharacterCard :character="props.character" />
                </v-list-item>
            </v-list>
        </v-menu>

    </div>
</template>

<script setup>

import { reactive } from "vue";

    // Props
    const props = defineProps({

        character: Object,
        selected: {

            default: false,
            type: Boolean
        }
    });

    // Data
    const pop_delay = reactive({

        hide: 200,
        show: 400
    });
</script>

<style scoped>

    .character-box {

        height: 100px;
        width: 100px;
    }

    .character-image {

        height: 100px;
        max-height: 100px;
        max-width: 100px;
    }
</style>
