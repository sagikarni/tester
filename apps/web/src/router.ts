import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import * as NProgress from 'nprogress';

import ActivityDetails from '@/views/activityDetails.vue';

import LoginPage from '@/views/login-page.vue';
import RegisterPage from '@/views/register-page.vue';
import VerifyPage from '@/views/verify-page.vue';
import ProfilePage from '@/views/profile-page.vue';
import RecoverAccountPage from '@/views/recover-account-page.vue';
import VerifyPasswordPage from '@/views/verify-password-page.vue';
import ChangePasswordPage from '@/views/change-password-page.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    { path: '/activity-details', component: ActivityDetails },
    { path: '/activity-details/:activityId', component: ActivityDetails },

    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/verify', component: VerifyPage },
    { path: '/recover-account', component: RecoverAccountPage },
    { path: '/verify-password', component: VerifyPasswordPage },
    {
      path: '/password',
      component: ChangePasswordPage,
      meta: { requiresAuth: true },
    },
    { path: '/profile', component: ProfilePage, meta: { requiresAuth: true } },
  ],
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
