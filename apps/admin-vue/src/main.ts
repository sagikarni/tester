import Vue from 'vue';

import 'normalize.css';
import ElementUI from 'element-ui';
import SvgIcon from 'vue-svgicon';
import './styles/index.scss';
import './icons';
import './permission';

import 'vue2-dropzone/dist/vue2Dropzone.min.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vDragDrop from 'v-drag-drop';
Vue.use(vDragDrop);

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
