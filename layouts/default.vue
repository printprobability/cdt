<template>
  <v-app>
    <v-app-bar class="shadow-sm">
      <!-- <v-app-bar-title
                class="dldt-navbar-title"
                :text="$siteConfig.navbartitle"
                :to="{ name: 'index' }"
            > -->
      <v-app-bar-title class="dldt-navbar-title">
        <a href="/?pq_year_early=1660&pq_year_late=1700" style="text-decoration: none; text-wrap: wrap" aria-label="Home">
          {{ $siteConfig.navbartitle }}
        </a>
      </v-app-bar-title>

      <!-- <v-list-item class="dldt-navbar-link px-2" :to="{ name: 'books' }">Books</v-list-item> -->
      <v-app-bar-nav-icon v-if="isXs" class="dldt-navbar-link px-2 mr-3" variant="text" @click.stop="drawer = !drawer"/>
      <template v-else>
        <v-list-item class="dldt-navbar-link px-2 mr-3" :to="{ name: 'printers' }" aria-label="To printer list">
          Printers
        </v-list-item>
        <v-list-item class="dldt-navbar-link px-2 mr-3" :to="{ name: 'about' }" aria-label="To about">
          About
        </v-list-item>
      </template>
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

    <v-navigation-drawer
      v-if="isXs"
      v-model="drawer"
      location="right"
      disable-resize-watcher
      temporary
    >
      <v-list>
        <v-list-item class="dldt-navbar-link px-2 mr-3" :to="{ name: 'printers' }" aria-label="To printer list">
          Printers
        </v-list-item>
        <v-list-item class="dldt-navbar-link px-2 mr-3" :to="{ name: 'about' }" aria-label="To about">
          About
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

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
        <slot/>
      </v-container>
    </v-main>

    <footer class="footer">
      <v-row class="footer-container">
        <v-col md="4" cols="12">
          <div class="footer-logo text-center" aria-label="Footer logo">
            <img class="w" alt="Footer logo" src="/img/logo.jpg"
                 style="width: 203px; padding: 15px; background-color: white;">
          </div>
        </v-col>

        <v-col md="4" cols="12" class="px-4">
          <div class="footer-about" aria-label="About">
            <h3>ABOUT</h3>
            <br>
            <p>To learn more about the Print & Probability project, visit <a target="_blank" aria-label="Print & Probability project" href="https://printprobability.org">https://printprobability.org</a>. Or connect with us on Bluesky (<a target="_blank" aria-label="Link to Bluesky profile" href="https://bsky.app/profile/print-and-prob.bsky.social">https://bsky.app/profile/print-and-prob.bsky.social</a>).</p>
          </div>
        </v-col>

        <v-col md="4" cols="12" class="px-4">
          <div class="footer-terms" aria-label="Terms of use">
            <h3>TERMS OF USE</h3>
            <br>
            <p>The CDT is licensed under <a target="_blank" aria-label="CC-BY-NC license" href="https://creativecommons.org/licenses/by-nc/4.0/">a CC-BY-NC license</a>. See the “Cite as” field on individual letter pages for citation format: e.g., “thompson_A1685.001,” in Catalog of Distinctive Type (CDT). Edited by Christopher N. Warren, et al., <a target="_blank" aria-label="Link to character: thompson_A1685.001" href="https://cdt.library.cmu.edu/characters/thompson_A1685.001">https://cdt.library.cmu.edu/characters/thompson_A1685.001</a>.</p>
          </div>
        </v-col>
      </v-row>
    </footer>

  </v-app>
</template>

<script setup>
import {useDisplay} from "vuetify";
import {ref, watch} from "vue";

const {$siteConfig} = useNuxtApp();

useHead({title: `${$siteConfig.maintitle} - ${$siteConfig.subtitle}`});

// Get Vuetify breakpoints
const isXs = useDisplay().xs;
// Watch breakpoint to control drawer
watch(isXs, (value) => {if (!value) drawer.value = false})

// Drawer
const drawer = ref(false)
</script>

<style scoped lang="scss">
.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.main-padding-top {
  padding-top: 64px !important;
}

// Footer Styling /
.footer {
  background-color: white;
  padding: 20px 0;
  font-family: Arial, sans-serif;
}

.footer-container {
  //max-width: 1200px;
  margin: 0 auto;
  justify-content: space-evenly;
}

.footer-logo h3 {
  font-size: 1.5em;
}

.footer-about p, .footer-terms p {
  font-size: 0.9em;
  line-height: 1.6;
}

.footer-bottom {
  text-align: center;
  border-top: 1px solid #444;
  padding: 10px;
  font-size: 0.85em;
  color: #aaa;
}

.footer-bottom p {
  margin: 5px 0;
}
</style>
