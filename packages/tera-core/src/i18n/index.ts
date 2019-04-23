import Vue from 'vue';
import VueI18n from 'vue-i18n';

import languages from '../data/languages.json';
// import en from '../lang/en';

const en = {};

Vue.use(VueI18n);

export function createI18n(router) {
  const fallbackLocale = 'en';
  const loadedLanguages = [];
  const globalLanguages = {};

  let locale = fallbackLocale;
  if (typeof document !== 'undefined') {
    locale = document.documentElement.lang;
  }

  const i18n = new VueI18n({
    locale,
    messages: { en },
    fallbackLocale,
  });

  function setI18nLanguage(lang) {
    i18n.locale = lang;

    document.querySelector('html').setAttribute('lang', lang);

    return lang;
  }

  function loadLanguageAsync(lang) {
    if (!loadedLanguages.includes(lang)) {
      const { locale } = languages.find(
        (l) => lang === l.alternate || lang === l.locale
      ) || { locale: null };
      if (!locale) return Promise.reject(new Error('Language not found'));
      return import(
        /* webpackChunkName: "lang-[request]" */ `../lang/${locale}`
      )
        .then((msgs) => {
          loadedLanguages.push(lang);
          globalLanguages[lang] = msgs.default;
          i18n.setLocaleMessage(lang, globalLanguages[lang]);
          return Promise.resolve(setI18nLanguage(lang));
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    }
    return Promise.resolve(setI18nLanguage(lang));
  }

  router.beforeEach((to, from, next) => {
    loadLanguageAsync(to.params.lang)
      .then(() => next())
      .catch(() => next('/' + fallbackLocale));
  });

  return i18n;
}
