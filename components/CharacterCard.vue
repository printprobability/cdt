<template>
    <div>
        <p>
            <NuxtLink :to="character_link">
                <v-img :src="props.character.image.buffer"></v-img>
            </NuxtLink>
        </p>
        <NuxtLink :to="character_link">See character in context</NuxtLink>
    </div>
</template>

<script setup>

    // Metadata
    definePageMeta({ name: "CharacterCard" });

    // Props
    const props = defineProps({ character: Object });

    // Computed
    const character_link = computed(() => {

        return {
                
            name: "characters-id",
            params: { id: props.character.id, }
        };      
    });

</script>
