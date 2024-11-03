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
      <v-list-item class="dldt-navbar-link px-2" :to="{ name: 'index' }">
        Characters
      </v-list-item
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

        <AlphaAlert v-if="$siteConfig.alpha" :contact="$siteConfig.contact"/>

        <slot/>
      </v-container>
    </v-main>

    <footer class="footer">
      <div class="footer-container">
        <div class="footer-logo text-center">
          <h3>CDT - Restoration England</h3>
          <img class="w" alt="Footer logo" src="/img/logo.jpg"
               style="width: 271px; padding: 15px; background-color: white;">
        </div>

        <div class="footer-contact" :style="footerContactAndSocialStyles">
          <h4>Contact Us:</h4>
          <p>Carnegie Mellon University</p>
          <p>5000 Forbes Ave, Pittsburgh, PA 15213</p>
          <p>Phone: +1 (412) 268-2000</p>
          <p>Email: <a href="mailto:library@cmu.edu">library@cmu.edu</a></p>
        </div>

        <div class="footer-links" :style="footerLinksStyles">
          <h4>Quick Links:</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Collections</a></li>
            <li><a href="#">Research Support</a></li>
            <li><a href="#">Library Services</a></li>
            <li><a href="#">News &amp; Events</a></li>
          </ul>
        </div>

        <div :class="footerSocialClasses" :style="footerContactAndSocialStyles">
          <h4>Connect with Us:</h4>
          <p>
            <a href="#">Facebook</a> |
            <a href="#">Twitter</a> |
            <a href="#">LinkedIn</a> |
            <a href="#">Instagram</a>
          </p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© 2024 CDT - Restoration England - All Rights Reserved</p>
        <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a></p>
      </div>
    </footer>

  </v-app>
</template>

<script setup>
const {$siteConfig} = useNuxtApp();
import {useDisplay} from "vuetify";

useHead({title: `${$siteConfig.maintitle} - ${$siteConfig.subtitle}`});

// Get Vuetify breakpoints
const display = useDisplay();

// *****************************
// Classes
// *****************************

const footerContainerClasses = computed(() => ({
  'footer-container': true,
  // 'justify-space-evenly': display.smAndDown
}));

const footerSocialClasses = computed(() => ({
  'footer-social': true,
  'pl-2': display.mdAndUp.value,
  // 'justify-space-evenly': display.smAndDown
}));

// *****************************
// Styles
// *****************************

const footerContactAndSocialStyles = computed(() => ({
  width: display.mdAndUp.value ? '250px' : '300px'
}))

const footerLinksStyles = computed(() => ({
  // width: display.smAndDown ? '300px' : '283px'
  width: display.mdAndUp.value ? '200px' : '300px'
}))</script>

<style scoped lang="scss">
.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.main-padding-top {
  padding-top: 64px !important;
}

// Footer Styling /
.footer {
  background-color: #333;
  color: #f0f0f0;
  padding: 20px 0;
  font-family: Arial, sans-serif;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  justify-content: space-evenly;
  gap: 20px;
}

.footer-logo h3 {
  font-size: 1.5em;
}

.footer-logo, .footer-contact, .footer-social {
  width: 300px;
}

.footer-contact h4, .footer-links h4, .footer-social h4 {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.footer-contact p, .footer-social p, .footer-bottom p {
  font-size: 0.9em;
  line-height: 1.6;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links ul li {
  margin: 5px 0;
}

.footer-links ul li a, .footer-social p a, .footer-bottom a {
  color: #f0f0f0;
  text-decoration: none;
  font-size: 0.9em;
}

.footer-social p a:hover, .footer-links ul li a:hover, .footer-bottom a:hover {
  text-decoration: underline;
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
