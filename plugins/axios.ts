import axios from "axios";
import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app";

var axiosInstance;

export default defineNuxtPlugin((nuxtApp) => {

  // Retrieve options from module
  const options = useRuntimeConfig().public.axios ?? {}
  // Create Axios instance
  const axiosInstance = axios.create(options)

  // Inject
  nuxtApp.provide('axios', axiosInstance)
})

export { axiosInstance as axios };
