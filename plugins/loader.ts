import { defineNuxtPlugin, useState } from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
  // Create state
  const loading = useState('loading', () => false)

  // Inject
  nuxtApp.provide('loader', {
    isLoading: () => loading.value === true,
    load: () => loading.value = true,
    finish: () => loading.value = false
  })
})
