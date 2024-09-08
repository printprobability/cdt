<template>
    <div>
        <p>
            <NuxtLink :to="characterLink">
                <v-img :src="props.character.image.buffer"></v-img>
            </NuxtLink>
        </p>
        <NuxtLink :to="characterLink">See character in context</NuxtLink>
    </div>
</template>

<script setup>

    // Metadata
    // definePageMeta({ name: "CharacterCard" });

    // Props
    const props = defineProps({ character: Object });

    // Computed
    const characterLink = computed(() => {

        return {
                
            name: "characters-id",
            params: { id: props.character.id, }
        };      
    });

</script>
