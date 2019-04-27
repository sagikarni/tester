export default [
  {
    path: ':overview/commonality/:id/start',
    name: 'commonality/start',
    component: () =>
      import(
        /* webpackChunkName: "commonality-activity" */ './components/start.vue'
      ),
  },
];
