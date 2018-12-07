import Vue from 'vue';
import Router from 'vue-router';
import { Trans } from '@libs/core/translation';

import Shell from '@libs/core/shell.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:lang([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})',
      component: Shell,
      beforeEnter: Trans.routeMiddleware,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import(/* webpackChunkName: "home" */ './views/home.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ '@libs/auth/components/login.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import(/* webpackChunkName: "register" */ '@libs/auth/components/register.vue')
        },
        {
          path: 'recover-account',
          name: 'recover-account',
          component: () => import(/* webpackChunkName: "recover-account" */ '@libs/auth/components/recover-account.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "profile" */ '@libs/auth/components/profile.vue')
        },
        {
          path: ':overview',
          name: 'overview',
          component: () => import(/* webpackChunkName: "overview" */ '@libs/activity/components/overview.vue')
        },
        {
          path: ':overview/:category',
          name: 'category',
          component: () => import(/* webpackChunkName: "category" */ '@libs/activity/components/category.vue')
        },
        {
          path: ':overview/:category/:id',
          name: 'activity',
          component: () => import(/* webpackChunkName: "activity" */ '@libs/activity/components/activity.vue')
        },
        {
          path: ':overview/:category/:id/start',
          name: 'start',
          component: () => import(/* webpackChunkName: "start" */ '@libs/whats-in-the-picture-activity/components/start.vue')
        }
      ]
    },
    {
      path: '*',
      redirect: (to: any) => {
        const lang = Trans.currentLanguage || 'en';
        return `/${lang}${to.path}`;
      }
    }
  ]
});
