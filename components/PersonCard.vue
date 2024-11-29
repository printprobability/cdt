<template>
  <v-card class="person-card" variant="flat">
    <div class="person-card-container">
      <v-avatar class="person-card-avatar mx-auto" size="80" :aria-label="`${props.name}'s avatar`">
        <v-img :src="props.src" :alt="props.name"/>
      </v-avatar>

      <div class="person-card-info" :aria-label="props.name">
        <div class="person-card-name" :aria-label="props.name">
          {{ props.name }}
          <!--        <v-tooltip v-if="props.degree" activator="parent" location="bottom">{{ props.degree }}</v-tooltip>-->
        </div>

        <div class="person-card-role" :aria-label="`${props.name}'s degree`">
          <p v-for="role in props.roles">{{ role }}</p>
        </div>

        <div class="person-card-degree" :aria-label="`${props.name}'s degree`">
          {{ props.degree }}
        </div>

        <div class="person-card-social">
          <v-icon tag="a" icon="mdi-facebook" size="20" title="Facebook"
                  :href="props.social?.facebook ?? '#'" :aria-label="`${props.name}'s Facebook`"/>
          <v-icon tag="a" icon="mdi-twitter" size="20" title="Twitter"
                  :href="props.social?.twitter ?? '#'" :aria-label="`${props.name}'s Twitter`"/>
          <v-icon tag="a" icon="mdi-instagram" size="20" title="Instagram"
                  :href="props.social?.instagram ?? '#'" :aria-label="`${props.name}'s Instagram`"/>
          <v-icon tag="a" icon="mdi-linkedin" size="20" title="Linkedin" target="_blank"
                  :href="props.social?.linkedin ?? '#'" :aria-label="`${props.name}'s Twitter`"/>
        </div>
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
.person-card {
  width: 60%;
  background: #f9f9f9 !important;
  border-radius: 8px;
}

.person-card-container {
  padding: 30px;
  display: flex;
  flex-direction: row;
  height: 100%;
}

.person-card-avatar {
  display: block !important;

  & img {
    object-position: 0 10%;
  }
}

.person-card-info {
  padding-left: 25px;
  flex-grow: 1;

  & p {
    word-wrap: break-word;
  }
}

.person-card-name {
  font-size: 1.375rem;
  font-weight: 700;
}

.person-card-degree {
  padding-top: 4px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(60, 60, 60, .7);
}

.person-card-social {
  display: flex;
  flex-wrap: wrap;
  padding-top: 16px;

  & a {
    text-decoration: none !important;
    color: rgba(60, 60, 60, .7);

    &:not(:first-of-type) {
      margin-left: 8px;
    }
  }
}
</style>
