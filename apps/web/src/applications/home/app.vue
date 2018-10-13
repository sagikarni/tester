<template>
  <v-app>
    <home-toolbar />

    <v-content>

    </v-content>

    <home-footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    // Feature: () => import('./components/helpers/Feature'),
    // Hero: () => import('./components/helpers/Hero'),
    // MadeWithVuetify: () => import('./components/helpers/MadeWithVuetify'),
    // Sponsors: () => import('./components/helpers/Sponsors'),
    HomeFooter: () => import('./components/layout/Footer.vue'),
    HomeToolbar: () => import('./components/layout/Toolbar.vue')
  }
})
export default class App extends Vue {
  constructor() {
    super();
  }
}
</script>
