// Imports
// import * as cdt_routes from "./assets/json/cdt_routes.json"
import vuetify from "vite-plugin-vuetify";

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

  build: { transpile: ["vuetify"] },

  content: {
    // fullTextSearchFields: ["label", "notes"],
    // nestedProperties: ["page.sequence"]
    nestedProperties: [
      "image.buffer",
      "image.thumbnail",
      "image.webUrl",
      "page.image.iiifBase",
      "page.sequence"
    ],
    experimental: { search: true }
  },

  css: ["~/assets/scss/custom.scss"],
  devtools: { enabled: true },

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
        }
      }
  },

  // hooks: {

  //     async "nitro:config" (nitroConfig) {

  //         if ( nitroConfig.dev ) {

  //             return;
  //         }

  //         // Async logic
  //         const characters = await queryContent("characters").only(["id"]).find();
  //         const books = await queryContent("books").only(["id"]).find();
  //         const groupings = await queryContent("groupings").only(["id"]).find();

  //         const character_routes = characters.map(x => "/characters/" + x.id);
  //         const book_routes = books.map(x => "/books/" + x.id);
  //         const grouping_routes = groupings.map(x => "/groupings/" + x.id);

  //         console.log("CHARACTER ROUTES");
  //         console.log(JSON.stringify(character_routes));

  //         // return character_routes.concat(book_routes, grouping_routes);

  //         nitroConfig.prerender.routes.push(character_routes.concat(book_routes, grouping_routes));
  //     }
  // },

  modules: [
    // "@nuxt/content",
    "@vueuse/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
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

      // https://axios-http.com/docs/req_config
      axios: {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Authorization': process.env.API_TOKEN,
        },
        baseURL: process.env.API_BASE_URL + "/api"
      },
    },
  },

  nitro: {
    routeRules: {
      '/api/**': { proxy: process.env.PROXY_API_BASE_URL + '/api/**' },
    }
  },

  compatibilityDate: "2024-08-20"
});
