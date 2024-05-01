<template>
    <div class="m-1 character-box">

        <!-- Mimics b-popover -->
        <!-- <v-hover :open-delay="popDelay.show" :close-delay="popDelay.hide">
            <template v-slot:default="{ isHovering }"> -->
                <div :id="'hoverParent-' + props.character.id">
                    <!-- Card (conditionally shown on hover) -->
                    <!-- <v-card :id="'hoverCard-' + props.character.id" style="position: relative; top: -100px; right: -100px;">
                        <v-card-title>
                            <NuxtLink :to="{ name: 'characters-id', params: { id: props.character.id } }">
                                {{ props.character.label }}
                            </NuxtLink>
                        </v-card-title>
                        <v-card-text>
                            <CharacterCard :character="props.character" />
                        </v-card-text>
                    </v-card>     -->

                    <NuxtLink :to="{ name: 'characters-id', params: { id: props.character.id } }" @mouseover="hover = true" @mouseleave="hover = false">
                        <!-- Will be lazy loaded -->
                        <v-img
                            :class="{
                                
                                'border': selected,
                                'border-5': selected,
                                'border-primary': selected,
                                'character-image': true
                            }"
                            :id="props.character.id"
                            :alt="props.character.label"
                            :src="props.character.image.webUrl"
                            height="90"
                            @mouseover="hoverOver"
                            @mouseleave="hover = false"></v-img>
                    </NuxtLink>                        
                    
                </div>
            <!-- </template>
        </v-hover> -->
    </div>
</template>

<script setup>

    import { reactive } from "vue";

    console.log("CharacterImage setup");

    // Props
    const props = defineProps({

        character: Object,
        selected: {

            default: false,
            type: Boolean
        }
    });

    // Data
    const hover = ref(false);
    const popDelay = reactive({

        hide: 200,
        show: 400
    });

    // Methods

    function hoverOver(p_event) {

        hover = true
        p_event.stopPropagation();
    }
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
