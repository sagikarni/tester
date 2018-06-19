import Vue from 'vue';
import Vuetify from 'vuetify';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueIziToast from 'vue-izitoast';
import './registerServiceWorker';
import App from './App.vue';
import router from './router';
import store from './modules/store/store';
import {LocalePlugin, DirectionPlugin} from '@/plugins';
import {httpClient} from '@/httpClient';
import 'babel-polyfill';
import 'swiper/dist/css/swiper.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import fullscreen from 'vue-fullscreen';
import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';


Vue.config.productionTip = false;

httpClient.setDefaultHeaders();
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


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');


