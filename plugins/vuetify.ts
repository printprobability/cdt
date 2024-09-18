// Imports

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((nuxtApp) => {

    const vuetify = createVuetify({
      ssr: true,
        // Your configuration here...
    });
    nuxtApp.vueApp.use(vuetify);
});
