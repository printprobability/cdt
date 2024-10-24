// Imports
// import * as cdt_routes from "./assets/json/cdt_routes.json"
import vuetify, {transformAssetUrls} from "vite-plugin-vuetify";
import _ from "lodash"

// const getStaticRoutes = async () => {

//     const characters = await queryContent("characters").only(["id"]).find();
//     const books = await queryContent("books").only(["id"]).find();
//     const groupings = await queryContent("groupings").only(["id"]).find();

//     const character_routes = characters.map(x => "/characters/" + x.id);
//     const book_routes = books.map(x => "/books/" + x.id);
//     const grouping_routes = groupings.map(x => "/groupings/" + x.id);

//     return character_routes.concat(book_routes, grouping_routes);
// };

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // alias: { "@": resolve(__dirname, "/") },

  app: {
    head: {
      link: [{rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/vuetify@3.x/dist/vuetify.min.css', preload: true}]
    }
  },

  build: {
    transpile: ['vuetify']
  },

  // content: {
  //   fullTextSearchFields: ["label", "notes"],
  //   nestedProperties: ["page.sequence"]
  //   nestedProperties: [
  //     "image.buffer",
  //     "image.thumbnail",
  //     "image.webUrl",
  //     "page.image.iiifBase",
  //     "page.sequence"
  //   ],
  //   experimental: { search: true }
  // },

  css: ["~/assets/scss/custom.scss"],

  devtools: {enabled: true},

  hooks: {
    // async "nitro:config"(nitroConfig) {
    //     // Fetch the routes from our function above
    //     // const slugs = await getStaticRoutes();

    //     const character_ids = cdt_routes.characters;
    //     const book_ids = cdt_routes.books;
    //     const grouping_ids = cdt_routes.groupings;

    //     const character_routes = character_ids.map(x => "/characters/" + x.id);
    //     const book_routes = book_ids.map(x => "/books/" + x.id);
    //     const grouping_routes = grouping_ids.map(x => "/groupings/" + x.id);

    //     const slugs = character_routes.concat(book_routes, grouping_routes);

    //     // Add the characters, books, and groupings routes to the nitro config routes list
    //     nitroConfig.prerender.routes.push(...slugs);
    // },

    vite: {
      extendConfig(config) {
        // Vuetify Treeshake
        config.plugins.push(vuetify())
        // Vuetify customVariable
        config.css.preprocessorOptions = {
          scss: {
            api: 'modern-compiler',
            // additionalData: '@import "@/assets/scss/variables.scss";'
          }
        }
      },

      vue: {
        template: {
          transformAssetUrls,
        },
      },
    }
  },

  modules: [
    // "@nuxt/content",
    "@vueuse/nuxt",
  ],

  // optimizeDeps: {
  //     exclude: [
  //         "@nuxt/content",
  //         "@vueuse/core",
  //         "@vueuse/nuxt"
  //     ]
  // },

  sourcemap: true,

  ssr: true,

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      APP_ENV: process.env.APP_ENV,
      IIIF_HOST: process.env.IIIF_HOST,

      // https://axios-http.com/docs/req_config
      axios: {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          // 'Authorization': process.env.API_TOKEN,
        },
        baseURL: `${_.trimEnd(process.env.API_BASE_URL, '/')}/api`
      },
    },
  },

  nitro: process.env.APP_ENV === 'development' ? {
    routeRules: {
      '/iiif//**': {proxy: process.env.IIIF_HOST + '/iiif//**'},
    }
  } : '',

  compatibilityDate: "2024-10-24"
});
