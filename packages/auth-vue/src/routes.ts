export default [
  {
    path: 'login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ './components/login.vue'),
  },
  {
    path: 'register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "register" */ './components/register.vue'),
  },
  {
    path: 'recover-account',
    name: 'recover-account',
    component: () =>
      import(
        /* webpackChunkName: "recover-account" */ './components/recover-account.vue'
      ),
  },
  {
    path: 'change-password',
    name: 'change-password',
    component: () =>
      import(
        /* webpackChunkName: "change-password" */ './components/change-password.vue'
      ),
  },
  {
    path: 'verify',
    name: 'verify',
    component: () =>
      import(
        /* webpackChunkName: "verify-account" */ './components/verify-account.vue'
      ),
  },
  {
    path: 'profile',
    name: 'profile',
    component: () =>
      import(/* webpackChunkName: "profile" */ './components/profile.vue'),
  },
];
