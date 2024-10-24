<template>
  <v-app>
    <v-app-bar class="shadow-sm">
      <!-- <v-app-bar-title
                class="dldt-navbar-title"
                :text="$siteConfig.navbartitle"
                :to="{ name: 'index' }"
            > -->
      <v-app-bar-title class="dldt-navbar-title">
        <NuxtLink to="/" style="text-decoration: none">
          {{ $siteConfig.navbartitle }}
        </NuxtLink>
      </v-app-bar-title>

      <!-- <v-list-item class="dldt-navbar-link px-2" :to="{ name: 'books' }">Books</v-list-item> -->
      <v-list-item class="dldt-navbar-link px-2" :to="{ name: 'index', meta: {ahihi: 'true'} }"
        >Characters</v-list-item
      >
      <!-- <v-list-item class="dldt-navbar-link px-2" :to="{ name: 'groupings' }">Groupings</v-list-item> -->
      <!-- <v-list-item class="dldt-navbar-link px-2">Data</v-list-item>
            <v-list-item class="dldt-navbar-link pl-2 pr-3">About</v-list-item> -->

      <!-- <div class="d-flex ml-auto">
                <v-list-item>Books</v-list-item>
                <v-list-item>Characters</v-list-item>
                <v-list-item>Groupings</v-list-item>
                <v-list-item>Data</v-list-item>
                <v-list-item>About</v-list-item>
            </div> -->

      <!-- <v-list>
                <v-list-item class="dldt-navbar-link px-2" :to="{ name: 'books' }">Books</v-list-item>
                <v-list-item class="dldt-navbar-link px-2">Characters</v-list-item>
                <v-list-item class="dldt-navbar-link px-2">Groupings</v-list-item>
                <v-list-item class="dldt-navbar-link px-2">Data</v-list-item>
                <v-list-item class="dldt-navbar-link pl-2 pr-3">About</v-list-item>
            </v-list> -->

      <!-- <v-list-item :to="{ name: 'books' }">Books</v-list-item>
            <v-list-item :to="{ name: 'characters' }">Characters</v-list-item>
            <v-list-item :to="{ name: 'groupings' }">Groupings</v-list-item>
            <v-list-item :to="{ name: 'articles-slug', params: { slug: 'data' } }">Data</v-list-item>
            <v-list-item :to="{ name: 'articles-slug', params: { slug: 'about' } }">About</v-list-item> -->
    </v-app-bar>

    <!-- NOTE: v-app is the Vuetify app tag and is required to use vuetify components without error -->
    <v-main class="main-padding-top" style="">
      <v-container class="parent">
        <!-- <v-app-bar class="shadow-sm mb-3">
                    <v-app-bar-title :to="{ name: 'index' }" :text="$siteConfig.navbartitle"></v-app-bar-title>
                    <v-divider></v-divider>
                    <div class="d-flex ml-auto">
                        <v-list-item>Books</v-list-item>
                        <v-list-item>Characters</v-list-item>
                        <v-list-item>Groupings</v-list-item>
                        <v-list-item>Data</v-list-item>
                        <v-list-item>About</v-list-item>
                    </div>
                </v-app-bar> -->

        <AlphaAlert v-if="$siteConfig.alpha" :contact="$siteConfig.contact" />

        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
const { $siteConfig } = useNuxtApp();

useHead({ title: `${$siteConfig.maintitle} - ${$siteConfig.subtitle}` });
</script>

<style scoped lang="scss">
.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.main-padding-top {
  padding-top: 64px !important;
}
</style>
