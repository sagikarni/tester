<template>
  <div>
    <div>in root!</div>

    <v-slide-y-transition mode="out-in">
      <router-view v-if="languageIsValid" :key="$route.path"></router-view>
      <not-found-page v-else to="/en/"></not-found-page>
    </v-slide-y-transition>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import NotFoundPage from '@/pages/general/404Page.vue';
import languages from '@/data/i18n/languages.json';

import { App } from '@libs/tera-store';

export function camelActual(str: any) {
  return (str || '').replace(
    /-(\w)/g,
    (_: any, c: any) => (c ? c.toUpperCase() : '')
  );
}

@Component({
  components: {
    NotFoundPage
  },

  async beforeRouteUpdate(to, from, next) {
    console.log('in beforeRouteUpdate');
    const locale = to.params.lang;
    const localeFile = camelActual(locale);

    // const loadedLangs = this.loadedLangs;

    // if (loadedLangs.indexOf(locale) < 0) {
      await import(/* webpackChunkName: "lang" */
      /* webpackMode: "lazy-once" */
      `@/lang/${localeFile}`)
        .then((msgs: any) => this.$i18n.setLocaleMessage(locale, msgs.default))
        .catch((err: any) => Promise.resolve(err));
    // }

    (document as any).querySelector('html').setAttribute('lang', locale);
    this.$i18n.locale = locale;
    next();
  }
})
export default class Root extends Vue {
  @Prop()
  lang: any;

  @App.Getter('loadedLangs')
  loadedLangs: any;

  public availableLocales = languages.map((lang: any) => lang.locale);

  get languageIsValid() {
    return this.availableLocales.includes(this.lang);
  }

  constructor() {
    super();
  }

  async created() {
    const locale = this.lang;

    const localeFile = camelActual(locale);

    if (this.loadedLangs.indexOf(locale) < 0) {
      await import(/* webpackChunkName: "lang" */
      /* webpackMode: "lazy-once" */
      `@/lang/${localeFile}`)
        .then((msgs: any) => this.$i18n.setLocaleMessage(locale, msgs.default))
        .catch((err: any) => Promise.resolve(err));
    }

    (document as any).querySelector('html').setAttribute('lang', locale);

    this.$i18n.locale = this.lang;

    console.log('in created');
  }
}
</script>