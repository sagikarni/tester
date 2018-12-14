export default [
  {
    path: ':overview',
    name: 'overview',
    component: () => import(/* webpackChunkName: "overview" */ './components/overview.vue')
  },
  {
    path: ':overview/:category',
    name: 'category',
    component: () => import(/* webpackChunkName: "category" */ './components/category.vue')
  },
  {
    path: ':overview/:category/:id',
    name: 'activity',
    component: () => import(/* webpackChunkName: "activity" */ './components/activity.vue')
  },
  {
    path: ':overview/:category/:id/start',
    name: 'start',
    component: () => import(/* webpackChunkName: "start" */ '@libs/whats-in-the-picture-activity/components/start.vue')
  }
];
