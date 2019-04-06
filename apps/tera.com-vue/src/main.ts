// Polyfills for IE Support
import 'babel-polyfill';
import 'event-source-polyfill';

// Packages
import Vue from 'vue';
import { store } from 'vuex-store';

// Bootstrap
import '@/plugins';
import { createI18n } from 'tera-core';
import { createRouter } from '@/router';
import { sync } from 'vuex-router-sync';
// import components from 'tera-core/src/components';

import 'tera-core/src/components';

// Application
import App from './App.vue';

Vue.config.performance = process.env.NODE_ENV === 'development';

export async function createApp() {
  const router = createRouter();
  const i18n = createI18n(router);

  sync(store, router);

  const app = new Vue({
    router,
    store,
    i18n,
    // ...components,
    render: (h) => h(App),
  }).$mount('#app');
}

createApp();
