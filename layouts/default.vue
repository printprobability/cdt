<template>
  <v-app>
    <v-app-bar class="shadow-sm">
      <!-- <v-app-bar-title
                class="dldt-navbar-title"
                :text="$siteConfig.navbartitle"
                :to="{ name: 'index' }"
            > -->
      <v-app-bar-title class="dldt-navbar-title">
        <NuxtLink to="/" style="text-decoration: none" aria-label="Home">
          {{ $siteConfig.navbartitle }}
        </NuxtLink>
      </v-app-bar-title>

      <!-- <v-list-item class="dldt-navbar-link px-2" :to="{ name: 'books' }">Books</v-list-item> -->
<!--      <v-list-item class="dldt-navbar-link px-2" :to="{ name: 'index' }" aria-label="To character list">-->
<!--        Characters-->
<!--      </v-list-item>-->
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

        <AlphaAlert v-if="$siteConfig.alpha" :contact="$siteConfig.contact"/>

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
            <p>To learn more about the <strong>Print & Probability project</strong>, visit <a aria-label="Print & Probability project" href="https://printprobability.org">https://printprobability.org</a>. Or connect with us on <strong>X</strong> (<a aria-label="Link to X profile" href="https://x.com/print_and_prob">@print_and_prob</a>).</p>
          </div>
        </v-col>

        <v-col md="4" cols="12" class="px-4">
          <div class="footer-terms" aria-label="Terms of use">
            <h3>TERMS OF USE</h3>
            <br>
            <p>The CDT is licensed under <a aria-label="CC-BY-NC license" href="https://creativecommons.org/licenses/by-nc/4.0/">a CC-BY-NC license</a>. Citations to individual letters begin with a  (see the “Cite as” field on individual letter pages, e.g., “thompson_A1685.001,” in Catalog of Distinctive Type (CDT). Edited by Christopher N.Warren, et al.). When placed after the final backslash in the url, the character identifier leads to the page for that character: <a aria-label="Link to character: thompson_A1685.001" href="https://cdt.library.cmu.edu/characters/thompson_A1685.001">https://cdt.library.cmu.edu/characters/thompson_A1685.001</a></p>
          </div>
        </v-col>
      </v-row>
    </footer>

  </v-app>
</template>

<script setup>
const {$siteConfig} = useNuxtApp();
import {useDisplay} from "vuetify";

useHead({title: `${$siteConfig.maintitle} - ${$siteConfig.subtitle}`});

// Get Vuetify breakpoints
const display = useDisplay();
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
