import Vue from 'vue';
import './plugins/vuetify';
import './plugins/axios';
import App from '@/App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { i18n } from '@libs/tera-core';

Vue.config.productionTip = false;

async function createApp() {
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app');
}

createApp();
