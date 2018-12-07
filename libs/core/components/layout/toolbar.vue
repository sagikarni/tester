<template>
  <v-toolbar
    app
    clipped-right
    color="primary"
    dark
    fixed
    height="58"
    extension-height="48"
    ref="toolbar"
  >
    <v-toolbar-side-icon @click="toggle" v-show="!stateless"></v-toolbar-side-icon>

    <router-link :to="{ name: 'home' }">
      <img :src="require('@/assets/logo.svg')" height="38px" width="38px">
    </router-link>

    <v-fade-transition mode="out-in">
      <v-toolbar-title class="pb-1.hidden-xs-only">Tera
        <div v-text="$t('Vuetify.Home.getStarted')"></div>
      </v-toolbar-title>
    </v-fade-transition>

    <v-spacer/>

    <v-toolbar-items>
      <v-menu bottom offset-y left attach>
        <v-btn slot="activator" flat style="min-width: 48px">
          <img
            :src="`https://cdn.vuetifyjs.com/images/flags/${currentLanguage.country}.png`"
            width="26px"
          >
        </v-btn>
        <v-list light>
          <v-list-tile
            avatar
            v-for="language in languages"
            :key="language.locale"
            @click="translateI18n(language.locale)"
          >
            <v-list-tile-avatar tile size="24px">
              <img
                :src="`https://cdn.vuetifyjs.com/images/flags/${language.country}.png`"
                width="24px"
              >
            </v-list-tile-avatar>
            <v-list-tile-title>{{language.name}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <template v-if="!isAuthenticated">
        <v-btn v-if="!isAuthenticated" flat to="/login">Login</v-btn>
        <v-btn v-if="!isAuthenticated" flat to="/register">Register</v-btn>
      </template>

      <v-menu v-else :close-on-content-click="false" :nudge-width="200" offset-y>
        <v-avatar slot="activator" class="ml-4" size="40">
          <img v-if="currentUser.picture" :src="currentUser.picture">
          <img v-else src="http://www.gravatar.com/avatar/?d=identicon">
        </v-avatar>
        <v-card>
          <img
            v-if="currentUser.picture"
            :src="currentUser.picture"
            height="250px"
            aspect-ratio="2.5"
          >
          <img
            v-else
            height="250px"
            aspect-ratio="2.5"
            src="http://www.gravatar.com/avatar/?d=identicon"
          >

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{currentUser.name}}</h3>
              <div v-if="currentUser && currentUser.verified">verified</div>
              <div v-else>not verified</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange" to="/profile">Profile</v-btn>
            <v-btn flat color="orange" @click="logout">Log out</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Auth, LOGOUT_ACCOUNT } from '@libs/auth/store';
import { Trans } from '../../translation';
import { TeraStore, DRAWER_TOGGLE } from '../../store';

@Component({})
export default class Toolbar extends Vue {
  get currentLanguage() {
    return this.languages.find(l => l.locale === this.$i18n.locale);
  }
  @Auth.Action(LOGOUT_ACCOUNT) logoutAccount;

  stateless = false;
  @TeraStore.Action(DRAWER_TOGGLE) drawerToggle;

  languages = Trans.supportedLanguages;

  @Auth.Getter('isAuthenticated') isAuthenticated;
  @Auth.Getter('currentUser') currentUser;

  constructor() {
    super();
  }

  translateI18n(lang: any) {
    const to = this.$router.resolve({ params: { lang } });
    return Trans.changeLanguage(lang).then(() => {
      this.$router.push(to.location);
    });
  }

  toggle() {
    this.drawerToggle();
  }

  logout() {
    this.logoutAccount();
  }
}
</script>
