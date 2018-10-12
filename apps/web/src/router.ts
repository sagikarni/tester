import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
// import * as NProgress from 'nprogress';

// import ActivityPage from '@/views/activity-page.vue';
// import StartActivityPage from '@/views/start-activity-page.vue';

// import LoginPage from '@/views/login-page.vue';
// import RegisterPage from '@/views/register-page.vue';
// import VerifyPage from '@/views/verify-page.vue';
// import ProfilePage from '@/views/profile-page.vue';
// import RecoverAccountPage from '@/views/recover-account-page.vue';
// import VerifyPasswordPage from '@/views/verify-password-page.vue';
// import ChangePasswordPage from '@/views/change-password-page.vue';

import Routes from '@/data/routes.json';
import Root from '@/components/views/root.vue';

function getLanguageCookie() {
  if (typeof document === 'undefined') { return; }
  return new Map(document.cookie.split('; ').map((c) => c.split('=')) as any).get('currentLanguage');
}
// import { SinglePhotoActivityPage } from '@libs/tera-single-photo-activity';

Vue.use(Router);

// language regex:
// /^[a-z]{2,3}(?:-[a-zA-Z]{4})?(?:-[A-Z]{2,3})?$/
// /^[a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3}$/
const languageRegex = /^\/([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})(?:\/.*)?$/;


export function createRouter(store: any) {
  function route(path: any, view: any, fullscreen: any, props: any, children: any) {
    const hasChildren = Array.isArray(children);

    return {
      path,
      meta: { fullscreen },
      name: hasChildren ? undefined : view,
      props,
      component: () => import(`@/pages/${view}Page.vue`),
      children: hasChildren
        ? children.map((r: any) => route(
          r.route,
          r.page,
          r.fullscreen,
          r.props,
          r.children,
        ))
        : [],
    };
  }

  const routes = Routes.map((r: any) => route(
    r.route,
    r.page,
    r.fullscreen,
    r.props,
    r.children,
  ));

  routes.unshift({
    path: '/',
    name: 'home/Home',
    meta: { fullscreen: true },
    component: () => import(
      /* webpackChunkName: "home" */
      '@/pages/home/HomePage.vue',
    ),
  });

  const router = new Router({
    // base: release ? `/releases/${release}` : __dirname,
    // mode: release ? 'hash' : 'history',
    mode: 'history',
    // scrollBehavior,
    routes: [
      {
        path: '/:lang([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})',
        component: Root,
        props: (route) => ({ lang: route.params.lang }),
        children: routes,
      },
      {
        path: '*',
        redirect: (to) => {
          let lang = getLanguageCookie() || 'en';
          // let lang = 'en';
          console.log('lang', lang);

          if (!languageRegex.test('/' + lang)) { lang = 'en'; }
          return `/${lang}${to.path}`;
        },
      },
    ],
  });

  router.beforeEach((to, from, next) => {
    if (to.meta.fullscreen || from.meta.fullscreen) {
      store.commit('app/FULLSCREEN', !!to.meta.fullscreen);
    }
    next();
  });

  // Vue.use(VueAnalytics, {
  //   id: 'UA-75262397-3',
  //   router,
  //   autoTracking: {
  //     page: process.env.NODE_ENV !== 'development',
  //     pageviewOnLoad: false,
  //   },
  //   debug: process.env.DEBUG ? {
  //     enabled: true,
  //     trace: false,
  //     sendHitTask: true,
  //   } : false,
  // });

  return router;
}





// const router = new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home,
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () =>
//         import(/* webpackChunkName: "about" */ './views/About.vue'),
//     },

//     // { path: '/activity/view/:activityId', component: ActivityPage },

//     { path: '/activity/single-photo', component: ActivityPage },
//     { path: '/activity/start/single-photo', component: StartActivityPage },

//     // { path: '/activity/single-photo', component: ActivityPage },
//     // { path: '/activity-details', component: ActivityDetails },
//     // { path: '/activity-details/:activityId', component: ActivityDetails },
//     // { path: '/activity-details/:activityId/start', component: ActivityStart },

//     { path: '/login', component: LoginPage },
//     { path: '/register', component: RegisterPage },
//     { path: '/verify', component: VerifyPage },
//     { path: '/recover-account', component: RecoverAccountPage },
//     { path: '/verify-password', component: VerifyPasswordPage },
//     {
//       path: '/password',
//       component: ChangePasswordPage,
//       meta: { requiresAuth: true },
//     },
//     { path: '/profile', component: ProfilePage, meta: { requiresAuth: true } },
//   ],
// });

// router.beforeResolve((to, from, next) => {
//   // If this isn't an initial page load.
//   if (to.name) {
//     // Start the route progress bar.
//     NProgress.start();
//   }
//   next();
// });

// router.afterEach((to, from) => {
//   // Complete the animation of the route progress bar.
//   NProgress.done();
// });

// export default router;
