import Vue from 'vue';
import Router from 'vue-router';

import { routes } from '@/applications';
import View from '@/components/core/View.vue';

Vue.use(Router);

const languageRegex = /^\/([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})(?:\/.*)?$/;

const release = process.env.RELEASE;

function getLanguageCookie() {
  if (typeof document === 'undefined') {
    return;
  }
  return new Map(document.cookie.split('; ').map((c: any) => c.split('='))).get(
    'currentLanguage',
  );
}

export async function createRouter(store: any, applications = []) {
  const ro = await routes();


  const children = Object.values(ro).sort((a: any, b: any) => {
    if (!a.priority || !b.priority) {
      return 0;
    }
    if (a.priority > b.priority) {
      return -1;
    }
    if (a.priority < b.priority) {
      return 1;
    }
    return 0;
  });

  const router = new Router({
    base: release ? `/releases/${release}` : __dirname,
    mode: release ? 'hash' : 'history',
    // scrollBehavior,
    routes: [
      {
        path: '/:lang([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})',
        component: View,
        props: (route: any) => ({ lang: route.params.lang }),
        children,
      },
      {
        path: '*',
        redirect: (to: any) => {
          let lang = getLanguageCookie() || 'en';
          if (!languageRegex.test('/' + lang)) {
            lang = 'en';
          }
          return `/${lang}${to.path}`;
        },
      },
    ],
  } as any);

  // Vue.use(VueAnalytics, {
  //   id: 'UA-75262397-3',
  //   router,
  //   autoTracking: {
  //     page: process.env.NODE_ENV !== 'development',
  //     pageviewOnLoad: false
  //   },
  //   debug: process.env.DEBUG ? {
  //     enabled: true,
  //     trace: false,
  //     sendHitTask: true
  //   } : false
  // })

  return router;
}
