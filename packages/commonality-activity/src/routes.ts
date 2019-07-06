export default [
  {
    path: ':domain/commonality/:id/start',
    name: 'commonality/start',
    component: () =>
      import(
        /* webpackChunkName: "commonality-activity" */ './components/start.vue'
      ),
  },
];
