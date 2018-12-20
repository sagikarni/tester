export default [
  {
    path: ':overview/learning/:id/start',
    name: 'start',
    component: () => import(/* webpackChunkName: "learning-activity" */ './components/start.vue')
  }
];
