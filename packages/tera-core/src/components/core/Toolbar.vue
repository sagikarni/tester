<template>
  <v-toolbar
    color="primary"
    dark
    id="app-toolbar"
    class="elevation-0"
    app
    clipped-left
    clipped-right
    fixed
    height="44"
  >
    <v-toolbar-side-icon/>

    <router-link :to="{ name: 'home/Home' }">
      <v-img
        alt="Tera Logo"
        src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
        contain
        transition="scale-transition"
        height="28px"
        width="28px"
      />
    </router-link>

    <!-- <v-toolbar-title class="ma-2">Tera</v-toolbar-title> -->

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        class="font-weight-light"
        v-for="link in linksLeft"
        :key="link"
        flat
        :to="link"
      >{{ $t(`Vuetify.AppToolbar.${link}`) }}</v-btn>
    </v-toolbar-items>

    <v-spacer/>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        class="font-weight-light"
        v-for="link in linksRight"
        :key="link"
        flat
        :to="link"
      >{{ $t(`Vuetify.AppToolbar.${link}`) }}</v-btn>
    </v-toolbar-items>

    <core-login-status/>

    <!-- <core-locales/> -->
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import { TeraStoreModule } from '../../store';

@Component
export default class Toolbar extends Vue {
  linksLeft = ['cognition', 'speech', 'communication', 'learning'];
  linksRight = ['pricing']; // hidden in 678px.

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
