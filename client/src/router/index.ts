import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import NormalView from '@/views/NormalView.vue';
import FullScreenView from '@/views/FullScreenView.vue';
import About from '@/views/About.vue';
import SlideShowView from '@/views/SlideShowView.vue';
import Search from '@/views/Search.vue';
import ActivityDetails from '@/views/activityDetails.vue';
import PremiumCollection from '@/views/PremiumCollection.vue';
import CategorizationActivity from '@/views/CategorizationActivity.vue';
import PuzzleActivity from '@/views/PuzzleActivity.vue';
import MemoryView from '@/views/memoryView.vue';
import SoundsAndPhoto from '@/views/SoundsAndPhoto.vue';
import { bus, busConstants } from '@/modules/utils/eventBus';

import LoginPage from '@/views/login-page.vue';
import RegisterPage from '@/views/register-page.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'NormalView',
      component: NormalView,
      //      component: () => import('@/views/NormalView'),
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
        // delay full screen in 200 milisec
        // this solves a layout bug caused by openeing full screen while rendering the new page at thhe same time
        setTimeout(() => {
          next();
        }, 200);
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
        {
          path: '/categorization-activity/:activityId',
          component: CategorizationActivity,
        },
        {
          path: '/puzzle-activity/:activityId',
          component: PuzzleActivity,
        },
        {
          path: '/memory-activity/:activityId',
          component: MemoryView,
        },
        {
          path: '/photo-sound/:activityId',
          component: SoundsAndPhoto,
        },
      ],
    },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
  ],
});

// router.beforeEach((to, from, next) => {
//   const publicPages: any = ['/login', '/register'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   if (authRequired && !loggedIn) {
//     return next('/login');
//   }

//   next();
// });