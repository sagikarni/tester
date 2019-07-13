import Vue from 'vue';
import Router from 'vue-router';
// import VueAnalytics from 'vue-analytics';
// import scrollBehavior from './scroll-behavior';
// import redirects from './301.json';
// import languages from '@/data/i18n/languages.json';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { Route } from 'vue-router';

import { Shell, routes as coreRoutes } from 'tera-core';
import { routes as authRoutes } from 'auth-vue';
import { routes as activityRoutes } from 'activity';

import { routes as pricingRoutes } from 'pricing';

import activitiesRoutes from './activities-routes';

import { AppModule } from 'tera-core/src/store/app';

Vue.use(Router);

// language regex:
// /^[a-z]{2,3}(?:-[a-zA-Z]{4})?(?:-[A-Z]{2,3})?$/
// /^[a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3}$/
const languageRegex = /^\/([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})(?:\/.*)?$/;
// const fallbackLocale = languages.find((lang) => !!lang.fallback).locale;

const children = [
  ...coreRoutes,
  ...authRoutes,
  ...pricingRoutes,
  ...activityRoutes,
  ...activitiesRoutes,
];

export function createRouter() {
  const router = new Router({
    base: process.env.BASE_URL,
    mode: 'history',
    // scrollBehavior,
    routes: [
      {
        path: '/:lang([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})',
        component: Shell,
        //  beforeEnter: Trans.routeMiddleware,
        children,
      },
      {
        path: '*',
        redirect: (to: any) => {
          //      const lang = Trans.currentLanguage || 'en';
          const lang = 'en';
          return `/${lang}${to.path}`;
        },
      },
      //   component: () =>
      //     import(/* webpackChunkName: "root" */ '@/views/Root.vue'),
      //   props: (route) => ({ lang: route.params.lang }),
      //   children: [
      //     ...Object.keys(redirects).map((k) => ({
      //       path: k.replace(/^\//, ''),
      //       redirect: () => redirects[k].replace(/^\//, ''),
      //     })),
      //     {
      //       path: '',
      //       name: 'home/Home',
      //       component: () =>
      //         import(/* webpackChunkName: "home" */ '@/pages/home/Page.vue'),
      //     },
      //     {
      //       path: '*',
      //       redirect: (to) => {
      //         let lang = `/${'en' || fallbackLocale}`;
      //         if (!languageRegex.test(lang)) {
      //           lang = `/${fallbackLocale}`;
      //         }

      //         return `${lang}`;
      //       },
      //     },
      //   ],
      // },
      // {
      //   path: '*',
      //   redirect: (to) => {
      //     let lang = `/${'en' || fallbackLocale}`;
      //     if (!languageRegex.test(lang)) {
      //       lang = `/${fallbackLocale}`;
      //     }

      //     return `${lang}/404`;
      //   },
    ],
  });

  // Vue.use(VueAnalytics, {
  //   id: 'UA-XXXXXXX-X',
  //   router,
  //   autoTracking: {
  //     page: process.env.NODE_ENV !== 'development',
  //     pageviewOnLoad: false,
  //   },
  //   debug: process.env.DEBUG
  //     ? {
  //         enabled: true,
  //         trace: false,
  //         sendHitTask: true,
  //       }
  //     : false,
  // });

  router.beforeEach((to: Route, from: Route, next: any) => {
    if (to.name) {
      NProgress.start();
    }

    AppModule.showToolbar(!to.meta.hasToolbar);
    AppModule.showDrawer(!to.meta.hasDrawer);
    AppModule.showFooter(!to.meta.hasFooter);

    //   debugger;
    // }
    next();
  });

  router.afterEach(() => {
    NProgress.done();
  });

  return router;
}

// import Vue from 'vue';
// import Router from 'vue-router';
// import { Trans, Shell, routes as coreRoutes } from 'tera-core';
// import { routes as authRoutes } from 'auth-vue';
// import { routes as activityRoutes } from 'activity';
// import { routes as plainActivityRoutes } from 'plain-activity';

// Vue.use(Router);

// const children = [
//   ...coreRoutes,
//   ...authRoutes,
//   ...activityRoutes,
//   ...plainActivityRoutes,
// ];

// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/:lang([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})',
//       component: Shell,
//       beforeEnter: Trans.routeMiddleware,
//       children,
//     },
//     {
//       path: '*',
//       redirect: (to: any) => {
//         const lang = Trans.currentLanguage || 'en';
//         return `/${lang}${to.path}`;
//       },
//     },
//   ],
// });
