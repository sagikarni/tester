export default [
  {
    path: ':domain/wh-questions/:id/start',
    name: 'wh-questions/start',
    component: () =>
      import(
        /* webpackChunkName: "wh-questions-activity" */ './components/start.vue'
      ),
  },
];
