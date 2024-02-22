<template>
    
    <v-container fluid>

        <!-- Site title and subtitle -->
        <header class="text-center my-5">
            <h1 class="text-h2">{{ $siteConfig.maintitle }}</h1>
            <h1 class="text-h1">{{ $siteConfig.subtitle }}</h1>
            <img :src="$siteConfig.fleuron.image" class="my-3" height="70" :alt="$siteConfig.fleuron.alt" />
            <p class="text-h3">{{ $siteConfig.abstract }}</p>
        </header>

        <p class="text-h3 text-center">Get started:</p>

        <!-- Ways of browsing the site's contents and About -->
            <v-row v-for="pair in paired_boxes.pairs" :key="pair.id" class="d-flex mb-2">
                <!-- <v-col cols="2"></v-col> -->
                <v-col cols="6" v-for="box in pair.boxes" :key="box.image">
                    <SplashBox
                        :alt="box.alt"
                        :image="box.image"
                        :title="box.title"
                        :text="box.text"
                        :to="box.to"/>
                </v-col>
                <!-- <v-col cols="2"></v-col> -->
            </v-row>

        <!--  Data download -->
        <v-row v-if="!!paired_boxes.final_row" class="d-flex align-self-center">
            <!-- <v-col cols="4"></v-col>  -->
            <v-col cols="6">
                <SplashBox
                    :alt="paired_boxes.final_row.alt"
                    :image="paired_boxes.final_row.image"
                    :title="paired_boxes.final_row.title"
                    :text="paired_boxes.final_row.text"
                    :to="paired_boxes.final_row.to"/>
            </v-col>
            <!-- <v-col cols="4"></v-col> -->
        </v-row>

    </v-container>
    
</template>
  
<script>

    export default {

        name: "IndexPage",

        data() {

            return {

                paired_boxes: {
                    
                    final_row: null,
                    pairs: []
                }
            };
        },

        mounted() {

            // Split splashboxes into pairs of two, with an optional final singleton if list is odd-numbered
            var index = 0;
            const n_boxes = this.$siteConfig.splashboxes.length;
            while ( index <= n_boxes - 2 ) {

                this.paired_boxes.pairs.push({

                    id: index,
                    boxes: [

                        this.$siteConfig.splashboxes[index],
                        this.$siteConfig.splashboxes[index + 1],
                    ],
                });

                index += 2;
            }

            // Add on final single row if needed
            if ( index == n_boxes - 1 ) {

                this.paired_boxes.final_row = this.$siteConfig.splashboxes[index];
            }
        }
    };

</script>

<style></style>