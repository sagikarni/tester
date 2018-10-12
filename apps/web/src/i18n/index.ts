// import { camelActual } from '@/util/helpers';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from '@/lang/en';
import * as langs from '@/lang';

Vue.use(VueI18n);

export function camelActual(str: string) {
  return (str || '').replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

export function createI18n(ssrContext: any) {
  let locale = 'en';

  //   if (ssrContext && ssrContext.lang) {
  //     locale = ssrContext.lang;
  //   } else
  if (typeof document !== 'undefined') {
    locale = document.documentElement!.lang;
  }

  const localePath = camelActual(locale);
  const messages = { en };
  //  debugger;
  if (locale !== 'en' && langs[localePath]) {
    (messages as any)[locale] = langs[localePath];
  }

  return new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
  });
}
