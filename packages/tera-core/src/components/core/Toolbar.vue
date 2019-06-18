<template>
  <v-toolbar
    color="primary"
    dark
    id="app-toolbar"
    class="elevation-1"
    app
    clipped-left
    clipped-right
    fixed
    height="56"
  >
    <div
      style="position:fixed;top:0;left:0;width:22px;height:22px;background:#555;color:#fff;opacity:.5;"
    >{{$vuetify.breakpoint.name}}</div>

    <v-toolbar-side-icon @click="toggleDrawer"/>

    <v-spacer class="hidden-md-and-up"/>

    <router-link to="/">
      <v-img
        alt="Tera Logo"
        :src="require(`@/assets/logo.svg`)"
        contain
        transition="scale-transition"
        width="143px"
      />
    </router-link>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        class="font-weight-light"
        v-for="link in linksLeft"
        :key="link"
        flat
        :to="`/${link}`"
      >{{ $t(`Vuetify.AppToolbar.${link}`) }}</v-btn>
    </v-toolbar-items>

    <v-spacer/>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        class="font-weight-light"
        v-for="link in linksRight"
        :key="link"
        flat
        :to="`/${link}`"
      >{{ $t(`Vuetify.AppToolbar.${link}`) }}</v-btn>
    </v-toolbar-items>

  

    <core-login-status/>

    <!-- <core-locales/> -->
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AppModule } from '../../store/app';

@Component
export default class Toolbar extends Vue {
  linksLeft = ['cognition', 'speech', 'communication', 'learning'];
  linksRight = ['products']; // hidden in 678px.

  toggleDrawer() {
    AppModule.toggleDrawer();
  }
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
