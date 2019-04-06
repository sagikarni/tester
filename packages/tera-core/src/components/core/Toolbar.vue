<template>
  <v-toolbar
    id="app-toolbar"
    class="elevation-0"
    app
    clipped-left
    clipped-right
    color="primary"
    dark
    fixed
    height="44"
  >
    <v-toolbar-side-icon/>

    <router-link :to="{ name: 'home/Home' }">
      <v-img
        alt="Vuetify Logo"
        src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
        contain
        transition="scale-transition"
        height="38px"
        width="38px"
      />
    </router-link>

    <v-toolbar-title class="hidden-xs-only">Vuetify</v-toolbar-title>

    <v-spacer/>

    <v-toolbar-items>
      <v-btn
        v-for="link in links"
        :key="link"
        :to="{
          name: link,
          params: {
            lang: $route.params.lang,
            namespace: 'getting-started',
            page: 'quick-start'
          }
        }"
        flat
        style="min-width: 48px;"
      >
        <span class="hidden-sm-and-down">{{ $t(`Vuetify.AppToolbar.${link}`) }}</span>
        <v-icon class="hidden-md-and-up">mdi-file-document-box</v-icon>
      </v-btn>

      <core-login-status/>

      <core-locales/>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import { TeraStoreModule } from '../../store';

@Component
export default class Toolbar extends Vue {
  links = ['cognition', 'speech', 'communication', 'learning', 'pricing'];
  // stateless = false;
  // constructor() {
  //   super();
  // }
  // toggle() {
  //   TeraStoreModule.drawerToggle();
  // }
  //   ({
  //   // components: {
  //   //   LanguageSwitcher: () =>
  //   //     import(/* webpackChunkName: "language-switcher" */ '../helpers/language-switcher.vue'),
  //   //   LoginStatus: () =>
  //   //     import(/* webpackChunkName: "login-status" */ '../helpers/login-status.vue'),
  //   // },
  // })
}
</script>
