import VueI18n from 'vue-i18n';
import Vue from 'vue';
// import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE } from '@/constants/trans';
import en from './lang/en';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en }
});
