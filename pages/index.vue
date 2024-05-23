<template>
    
    <v-container fluid>

        <!-- Site title and subtitle -->
        <header class="text-center my-5">
            <h1 class="dldt-text-h2">{{ $siteConfig.maintitle }}</h1>
            <h1 class="dldt-text-h1">{{ $siteConfig.subtitle }}</h1>
            <v-img :src="$siteConfig.pnpLogo.image" class="my-3" height="70" :alt="$siteConfig.pnpLogo.alt"></v-img>
            <p class="dldt-text-h3">{{ $siteConfig.abstract }}</p>
        </header>

        <p class="dldt-text-h3 text-center">Get started:</p>

        <!-- Ways of browsing the site's contents and About -->
        <v-row v-for="pair in paired_boxes.pairs" :key="pair.id" class="d-flex mb-2">
            <v-col cols="6" v-for="box in pair.boxes" :key="box.image">
                <SplashBox
                    :alt="box.alt"
                    :image="box.image"
                    :text="box.text"
                    :title="box.title"
                    :to="box.to"/>
            </v-col>
        </v-row>

        <!--  Data download -->
        <v-row v-if="!!paired_boxes.final_row" class="d-flex align-self-center">
            <v-col cols="6">
                <SplashBox
                    :alt="paired_boxes.final_row.alt"
                    :image="paired_boxes.final_row.image"
                    :text="paired_boxes.final_row.text"
                    :title="paired_boxes.final_row.title"
                    :to="paired_boxes.final_row.to"/>
            </v-col>
        </v-row>

    </v-container>
    
</template>

<script setup>

    import { reactive } from "vue";

    // Meta
    definePageMeta({
        
        name: "IndexPage"
    });

    // Data
    const paired_boxes = reactive({
        
        final_row: null,
        pairs: []
    });
    const { $siteConfig } = useNuxtApp();

    // Lifecycle Hooks
    onMounted(() => {

        // Split splashboxes into pairs of two, with an optional final singleton if list is odd-numbered
        var index = 0;
        const n_boxes = $siteConfig.splashboxes.length;
        while ( index <= n_boxes - 2 ) {

            paired_boxes.pairs.push({

                id: index,
                boxes: [

                    $siteConfig.splashboxes[index],
                    $siteConfig.splashboxes[index + 1],
                ],
            });

            index += 2;
        }

        // Add on final single row if needed
        if ( index == n_boxes - 1 ) {

            paired_boxes.final_row = $siteConfig.splashboxes[index];
        }    
    });

</script>