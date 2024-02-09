// Imports

import Vue from "vue";

import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((nuxtApp) => {

    const vuetify = createVuetify({

        // Your configuration here...
    });
    nuxtApp.vueApp.use(vuetify);
});
