import Vue from 'vue';
import Router from 'vue-router';

import { Trans, Shell, routes as coreRoutes } from 'tera-core';
import { routes as authRoutes } from 'auth-vue';
import { routes as activityRoutes } from 'activity';
import { routes as plainSlidesActivityRoutes } from 'plain-slides-activity';

Vue.use(Router);

const children = [...coreRoutes, ...authRoutes, ...activityRoutes, ...plainSlidesActivityRoutes];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:lang([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})',
      component: Shell,
      beforeEnter: Trans.routeMiddleware,
      children
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
