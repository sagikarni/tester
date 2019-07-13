export default [
  {
    path: '',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ './home.vue'),
  },
  {
    path: 'boards',
    name: 'boards',
    component: () =>
      import(/* webpackChunkName: "my-boards" */ './my-boards.vue'),
  },
  {
    path: 'boards/:id',
    name: 'board',
    component: () =>
      import(/* webpackChunkName: "my-board" */ './my-board.vue'),
  },
  {
    path: 'profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ './profile.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "content" */ './Content.vue'),
  },
  {
    path: '/contactus',
    name: 'contactus',
    component: () => import(/* webpackChunkName: "content" */ './Content.vue'),
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import(/* webpackChunkName: "content" */ './Content.vue'),
  },
  {
    path: '/team',
    name: 'team',
    component: () => import(/* webpackChunkName: "content" */ './Content.vue'),
  },
  {
    path: '/tips',
    name: 'tips',
    component: () => import(/* webpackChunkName: "content" */ './Content.vue'),
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import(/* webpackChunkName: "content" */ './Content.vue'),
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import(/* webpackChunkName: "content" */ './Content.vue'),
  },
];
