import Vue from 'vue';
import './plugins/vuetify';
import './plugins/axios';
import App from '@/App.vue';
import router from './router';
import {Store as store } from 'vuex-store';
import { i18n } from 'tera-core';

import './registerServiceWorker';

Vue.config.productionTip = false;

async function createApp() {
  await new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app');
}

createApp();
