export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {

      // handle error, e.g. report to a service

      console.log("======================================");
      console.log("errorHandler");
      console.log(`error: ${JSON.stringify(error)}`);
      console.log(`info: ${info}`);
    }
  
    // Also possible
    nuxtApp.hook('vue:error', (error, instance, info) => {

      // handle error, e.g. report to a service

      console.log("======================================");
      console.log("vue:error");
      console.log(`error: ${JSON.stringify(error)}`);
      console.log(`info: ${info}`);
    })
  })