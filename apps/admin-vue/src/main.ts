import Vue from 'vue';
import 'vuetify/dist/vuetify.min.css';
import 'normalize.css';
import './style.scss';
import ElementUI from 'element-ui';
import SvgIcon from 'vue-svgicon';

import 'vue2-dropzone/dist/vue2Dropzone.min.css';

import './plugins/vuetify';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vDragDrop from 'v-drag-drop';
Vue.use(vDragDrop);

import './loader';

Vue.use(ElementUI);
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
