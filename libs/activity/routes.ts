export default [
  {
    path: ':overview',
    name: 'overview',
    component: () => import(/* webpackChunkName: "overview" */ './components/layout/overview.vue')
  },
  {
    path: ':overview/:category',
    name: 'category',
    component: () => import(/* webpackChunkName: "category" */ './components/layout/category.vue')
  },
  {
    path: ':overview/:category/:id',
    name: 'activity',
    component: () => import(/* webpackChunkName: "activity" */ './components/layout/activity.vue')
  },
  {
    path: ':overview/:category/:id/start',
    name: 'start',
    component: () => import(/* webpackChunkName: "start" */ '@libs/learning-activity/components/start.vue')
  }
];
