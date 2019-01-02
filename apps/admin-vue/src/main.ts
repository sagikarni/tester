import Vue from 'vue';

// import 'normalize.css';
import ElementUI from 'element-ui';
import SvgIcon from 'vue-svgicon';

// import './plugins/vuetify';
// import './plugins/axios';
import App from '@/App.vue';
import router from './router';
import store from './store';
// import './registerServiceWorker';

Vue.use(ElementUI);
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
});

Vue.config.productionTip = false;

async function createApp() {
  await new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
}

createApp();
