export default [
  {
    path: '',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ './home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "contentpage" */ './ContentPage.vue'),
  },
  {
    path: '/contactus',
    name: 'contactus',
    component: () =>
      import(/* webpackChunkName: "contentpage" */ './ContentPage.vue'),
  },
  {
    path: '/faq',
    name: 'faq',
    component: () =>
      import(/* webpackChunkName: "contentpage" */ './ContentPage.vue'),
  },
  {
    path: '/team',
    name: 'team',
    component: () =>
      import(/* webpackChunkName: "contentpage" */ './ContentPage.vue'),
  },
  {
    path: '/tips',
    name: 'tips',
    component: () =>
      import(/* webpackChunkName: "contentpage" */ './ContentPage.vue'),
  },
  {
    path: '/terms',
    name: 'terms',
    component: () =>
      import(/* webpackChunkName: "contentpage" */ './ContentPage.vue'),
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () =>
      import(/* webpackChunkName: "contentpage" */ './ContentPage.vue'),
  },
];
