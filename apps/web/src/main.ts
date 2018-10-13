import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'swiper/dist/css/swiper.min.css';

// Packages
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueAwesomeSwiper from 'vue-awesome-swiper';

// Bootstrap
import '@/components';
// import '@/plugins';
// import { createStore } from '@/store';
import store from './store';

import { createRouter } from '@/router';
import { createI18n } from '@/i18n';
import { sync } from 'vuex-router-sync';

// Application
import App from './App.vue';

// import '@/components';

import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.config.performance = process.env.NODE_ENV === 'development';

Vue.use(Vuetify);
Vue.use(VueAwesomeSwiper);

const i18n = createI18n(null);
const router = createRouter(store);

router.then((router: any) => {
  sync(store, router);

  new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
  }).$mount('#app');
});
