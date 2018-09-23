import Vue from 'vue';
import Vuetify from 'vuetify';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueIziToast from 'vue-izitoast';
import './registerServiceWorker';
import App from './App.vue';
import { router } from './router';
import store from '@/store';
import { LocalePlugin, DirectionPlugin } from '@/plugins';
import { httpClient } from '@/httpClient';
import 'babel-polyfill';
import 'swiper/dist/css/swiper.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import fullscreen from 'vue-fullscreen';
import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import VueLodash from 'vue-lodash';
import { CHECK_AUTH } from '@/modules/auth';
import ApiService from '@/shared/api.service';

Vue.config.productionTip = false;

// httpClient.setDefaultHeaders();

ApiService.init();

Vue.use(LocalePlugin);
Vue.use(DirectionPlugin);
Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b0bec5',
  },
});

Vue.use(fullscreen);
Vue.use(VueIziToast);
Vue.use(VueAwesomeSwiper);
Vue.use(VideoPlayer);
Vue.use(VueLodash, { name: 'lodash' });

router.beforeEach((to, from, next) => {
   return Promise.all([store.dispatch(`auth/${CHECK_AUTH}`)]).then(() => next());
});

new Vue({
  router,
  store,
  render: (h: any) => h(App),
}).$mount('#app');
