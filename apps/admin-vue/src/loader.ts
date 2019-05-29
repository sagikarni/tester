import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';
import { getToken } from './utils/auth';
import { Route } from 'vue-router';
import { AuthModule } from './store/auth.module';

const whiteList = ['/login'];

router.beforeEach((to: Route, from: Route, next: any) => {
  next();
  // NProgress.start();
  // if (getToken()) {
  //   if (to.path === '/login') {
  //     next({ path: '/dashboard/activities' });
  //     NProgress.done(); // If current page is dashboard will not trigger afterEach hook, so manually handle it
  //   } else {
  //     if (AuthModule.roles.length === 0) {
  //       AuthModule.GetInfo()
  //         .then(() => {
  //           next();
  //         })
  //         .catch((err) => {
  //           AuthModule.FedLogOut().then(() => {
  //             Message.error(err || 'Verification failed, please login again');
  //             next({ path: '/' });
  //           });
  //         });
  //     } else {
  //       next();
  //     }
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next();
  //   } else {
  //     next(`/login?redirect=${to.path}`); // Redirect to login page
  //     NProgress.done();
  //   }
  // }
});

router.afterEach(() => {
  NProgress.done();
});
