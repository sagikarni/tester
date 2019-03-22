<template>
  <v-toolbar
    app
    dark
    fixed
    clipped-right
    color="primary"
    height="58"
    extension-height="48"
  >
    <v-toolbar-side-icon @click="toggle" v-show="!stateless"></v-toolbar-side-icon>

    <router-link :to="{ name: 'home' }">
      <img :src="require('@/assets/logo.png')" height="38px" width="38px">
    </router-link>

    <v-fade-transition mode="out-in">
      <v-toolbar-title class="pb-1.hidden-xs-only">
        <div v-text="$t('Shell.title')"></div>
      </v-toolbar-title>
    </v-fade-transition>

    <v-spacer/>

    <v-toolbar-items>
      <language-switcher/>

      <login-status/>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TeraStoreModule } from '../../store';

@Component({
  components: {
    LanguageSwitcher: () =>
      import(/* webpackChunkName: "language-switcher" */ '../helpers/language-switcher.vue'),
    LoginStatus: () =>
      import(/* webpackChunkName: "login-status" */ '../helpers/login-status.vue')
  }
})
export default class Toolbar extends Vue {
  stateless = false;

  constructor() {
    super();
  }

  toggle() {
    TeraStoreModule.drawerToggle();
  }
}
</script>
