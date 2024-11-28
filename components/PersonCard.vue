<template>
  <v-card class="mx-auto" elevation="0">
    <div class="person-card-container">
      <v-avatar class="person-card-avatar mx-auto" size="108" :aria-label="`${props.name}'s avatar`">
        <v-img :src="props.src" :alt="props.name"/>
      </v-avatar>

      <div class="person-card-name" :aria-label="props.name">
        {{ props.name }}
        <v-tooltip v-if="props.degree" activator="parent" location="bottom">{{ props.degree }}</v-tooltip>

        <v-spacer/>
      </div>

      <div class="person-card-role" :aria-label="props.role">
        <p v-for="role in props.roles">{{ role }}</p>

        <v-spacer/>
      </div>

      <div class="person-card-social">
        <v-icon tag="a" icon="mdi-linkedin" size="20" title="Linkedin" target="_blank"
                :href="props.social?.linkedin ?? '#'" :aria-label="`${props.name}'s Twitter`"/>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

// Props
const props = defineProps({
  name: {type: String, default: 'name'},
  roles: {type: Array},
  degree: {type: String, default: 'Bachelor of ...'},
  social: {type: String},
  src: {type: String},
});
</script>

<style lang="scss">
.person-card-container {
  padding: 30px;

  @media (max-width: 960px) {
    padding: 20px;
  }
}

.person-card-avatar {
  display: block !important;

  & img {
    object-position: 0 10%;
  }
}

.person-card-name, .person-card-role {
  word-wrap: break-word;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.person-card-name {
  height: 90px;
  font-size: 1.375rem;
  font-weight: 700;
  margin: 30px 0 0;


  @media (max-width: 960px) {
    height: 57px;
  }

  @media (max-width: 350px) {
    height: 90px;
  }
}

.person-card-role {
  height: 160px;
  text-transform: none;
  letter-spacing: 2px;
  font-size: 1.125rem;
  font-style: italic;

  & p:not(:first-child) {
    margin-top: 4px;
  }

  @media (max-width: 960px) {
    height: 139px;
  }

  @media (max-width: 600px) {
    height: 112px;
  }

  @media (max-width: 350px) {
    height: fit-content;
    margin-bottom: 27px;
  }
}

.person-card-social {
  display: flex;
  white-space: nowrap;
  height: 20px;
  min-height: 16px;
  width: 80px;
  min-width: 68px;
  margin: 0 auto 0;
  //justify-content: space-between;
  justify-content: center;

  & a {
    text-decoration: none !important;
  }
}
</style>
