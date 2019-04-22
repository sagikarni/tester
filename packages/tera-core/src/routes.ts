export default [
  {
    path: '',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ './home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ './about.vue'),
  },
  {
    path: '/contactus',
    name: 'contactus',
    component: () =>
      import(/* webpackChunkName: "contactus" */ './contactus.vue'),
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import(/* webpackChunkName: "faq" */ './faq.vue'),
  },
  {
    path: '/team',
    name: 'team',
    component: () => import(/* webpackChunkName: "team" */ './team.vue'),
  },
  {
    path: '/tips',
    name: 'tips',
    component: () => import(/* webpackChunkName: "tips" */ './tips.vue'),
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import(/* webpackChunkName: "terms" */ './terms.vue'),
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import(/* webpackChunkName: "privacy" */ './privacy.vue'),
  },
];
