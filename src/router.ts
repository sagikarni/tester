import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import NormalView from './views/NormalView.vue';
import FullScreenView from './views/FullScreenView.vue';
import About from './views/About.vue';
import SlideShowView from './views/SlideShowView.vue';
import Search from './views/Search.vue';
import ActivityDetails from './views/activityDetails.vue';
import PremiumCollection from './views/PremiumCollection.vue';
import {bus, busConstants} from './modules/utils/eventBus';
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
    {
      path: '/',
      name: 'NormalView',
      component: NormalView,
      beforeEnter: (to, from, next) => {
        bus.$emit(busConstants.EXIT_FULL_SCREEN);
        next();
      },
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
          {
              path: '/activity-details',
              component: ActivityDetails,
          },
          {
              path: '/activity-details/:activityId',
              component: ActivityDetails,
          },
      ],
    },
        {
            path: '/full',
            name: 'FullScreenView',
            component: FullScreenView,
            beforeEnter: (to, from, next) => {
                bus.$emit(busConstants.ENTER_FULL_SCREEN);
                next();
            },
            children: [
                {
                    path: '/slideshow',
                    component: SlideShowView,
                },
                {
                    path: '/premium-collection/:activityId',
                    component: PremiumCollection,
                },
            ],

        },
  ],
});
