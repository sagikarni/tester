import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './modules/store/store';
import './registerServiceWorker';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import 'babel-polyfill';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import {LocalePlugin} from '@/locale/locale';
// Import component


Vue.config.productionTip = false;

Vue.use(LocalePlugin);

Vue.use(Vuetify, {
    theme: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b0bec5',
    },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');


