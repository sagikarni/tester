import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import NormalView from './views/NormalView.vue';
import FullScreenView from './views/FullScreenView.vue';
import About from './views/About.vue';
import SlideShowView from './views/SlideShowView.vue';
import Search from './views/Search.vue';
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
    {
      path: '/',
      name: 'NormalView',
      component: NormalView,
      children: [
          {
              path: '',
              component: Home,
          },
          {
              path: '/About',
              component: About,
          },
          {
              path: '/Search',
              component: Search,
          },
      ],
    },
        {
            path: '/full',
            name: 'FullScreenView',
            component: FullScreenView,
            children: [
                {
                    path: '/slideshow',
                    component: SlideShowView,
                },
            ],

        },
  ],
});
