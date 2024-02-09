<template>

    <b-container>

        <header class="text-center my-5">
            <h1 class="display-2">{{ $config.maintitle }}</h1>
            <h1 class="display-1">{{ $config.subtitle }}</h1>
            <b-img :src="$config.fleuron.image" class="my-3" height="70" :alt="$config.fleuron.alt" />
            <p class="display-2">{{ $config.abstract }}</p>
        </header>

        <p class="display-3 text-center">Get started:</p>

        <b-row v-for="pair in paired_boxes.pairs" :key="pair.id" class="mb-2">
            <b-col cols="6" v-for="box in pair.boxes" :key="box.image">
                <SplashBox :image="box.image" :alt="box.alt" :to="box.to" :head="box.head" :lead="box.lead" />
            </b-col>
        </b-row>

        <b-row v-if="!!paired_boxes.final_row" align-h="center">
            <b-col cols="6">
                <SplashBox :image="paired_boxes.final_row.image" :alt="paired_boxes.final_row.alt"
                    :to="paired_boxes.final_row.to" :head="paired_boxes.final_row.head"
                    :lead="paired_boxes.final_row.lead" />
            </b-col>
        </b-row>

    </b-container>

</template>
  
<script lang="ts" setup>

    import Vue from "vue";
    // import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
    import "@/assets/scss/custom.scss";

    const { $config } = useNuxtApp();

    // Vue.use(BootstrapVue);
    // Vue.use(IconsPlugin);

    export default {

        name: "IndexPage",

        data() {

            return {

                config: Vue.config,
                paired_boxes: {
                    pairs: [],
                    final_row: null,
                },
            };
        },

        mounted() {

            // Split splashboxes into pairs of two, with an optional final singleton if list is odd-numbered
            var index = 0;
            const n_boxes = this.$config.splashboxes.length;
            while (index <= n_boxes - 2) {
                this.paired_boxes.pairs.push({
                    id: index,
                    boxes: [
                        this.$config.splashboxes[index],
                        this.$config.splashboxes[index + 1],
                    ],
                });
                index += 2;
            }
            // Add on final single row if needed
            if (index == n_boxes - 1) {
                this.paired_boxes.final_row = this.$config.splashboxes[index];
            }
        }
    });
</script>

<style></style>