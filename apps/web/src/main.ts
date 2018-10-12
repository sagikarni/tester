// Packages
import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import VueAwesomeSwiper from 'vue-awesome-swiper';

import '@/components';

import { createI18n } from '@/i18n';

import {createRouter} from './router';
import store from './store';

import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './registerServiceWorker';
import 'swiper/dist/css/swiper.min.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueAwesomeSwiper);

const i18n = createI18n(null);
const router = createRouter(store);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
