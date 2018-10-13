<template>

  <v-toolbar app clipped-right color="primary" dark fixed height="58" extension-height="48" :flat="isHome()" :manual-scroll="isManualScrolled()" ref="toolbar">

    <v-toolbar-side-icon @click="toggle" v-show="!stateless"></v-toolbar-side-icon>

    <router-link :to="logoLink()">
      <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/46.0.0/web/web_32x32.png" height="38px" width="38px" />
    </router-link>

    <v-fade-transition mode="out-in">
      <v-toolbar-title class="pb-1.hidden-xs-only">Tera</v-toolbar-title>
    </v-fade-transition>

    <v-spacer />

    <v-toolbar-items>

      <v-menu bottom offset-y left attach>
        <v-btn slot="activator" flat style="min-width: 48px">
          <img :src="`https://cdn.vuetifyjs.com/images/flags/${currentLanguage.country}.png`" width="26px">
        </v-btn>
        <v-list light>
          <v-list-tile avatar v-for="language in languages" :key="language.locale" @click="translateI18n(language.locale)">
            <v-list-tile-avatar tile size="24px">
              <img :src="`https://cdn.vuetifyjs.com/images/flags/${language.country}.png`" width="24px" />

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
          <img v-if="currentUser.picture" :src="currentUser.picture" height="250px" aspect-ratio="2.5">
          <img v-else height="250px" aspect-ratio="2.5" src="http://www.gravatar.com/avatar/?d=identicon">

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
import { Auth } from '@libs/vue-auth';
import { TweenMax, Expo } from 'gsap';
import { App, DRAWER_TOGGLE } from '@libs/tera-store';

@Component({})
export default class Toolbar extends Vue {
  @App.Getter('stateless')
  stateless: any;
  @App.Getter('isFullscreen')
  isFullscreen: any;

  @App.Action(DRAWER_TOGGLE)
  drawerToggle: any;

  public languages = [
    {
      name: 'English',
      locale: 'en',
      country: 'us'
    },
    {
      name: 'Español',
      locale: 'es-MX',
      country: 'mx'
    },
    {
      name: 'Português',
      locale: 'pt-BR',
      country: 'br'
    },
    {
      name: 'Русский',
      locale: 'ru',
      country: 'ru'
    },
    {
      name: '简体中文',
      locale: 'zh-Hans',
      country: 'cn'
    },
    {
      name: '한국어',
      locale: 'ko',
      country: 'kr'
    },
    {
      name: '日本語',
      locale: 'ja',
      country: 'jp'
    }
  ];

  get currentLanguage() {
    return this.languages.find(l => l.locale === this.$i18n.locale);
  }
  //    currentLanguage () {
  // return this.languages.find(l => l.locale === this.$i18n.locale)
  //   },

  translateI18n(lang: any) {
    this.$router.replace({ params: { lang } });
    document.cookie = `currentLanguage=${lang};path=/;max-age=${60 *
      60 *
      24 *
      7}`; // expires in 7 days
  }

  public drawer: boolean = false;

  @Auth.Getter('isAuthenticated')
  isAuthenticated: any;

  logoLink() {
    return this.isHome
      ? { name: 'getting-started/QuickStart' }
      : { name: 'home/Home' };
  }

  public menuStateChanged($event: any) {
    if ($event.propertyName === 'transform') {
      if (this.drawer) {
        TweenMax.staggerFromTo(
          '.hidden',
          1,
          {
            x: '-200px',
            opacity: 0,
            ease: Expo.easeOut,
            scale: '0.8'
          },
          { opacity: 1, x: '0', ease: Expo.easeOut, scale: '1' },
          0.1
        );
      } else {
        TweenMax.set('.hidden', { opacity: 0 });
      }
    }
  }

  constructor() {
    super();
  }

  toggle() {
    this.drawerToggle();
    //$store.commit('app/DRAWER_TOGGLE')
  }

  isHome() {
    return true;
    // return this.route.name === 'home/Home';
  }

  isManualScrolled() {
    return !this.isHome && this.isFullscreen;
  }
}
</script>
