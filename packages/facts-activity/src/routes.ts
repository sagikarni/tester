export default [
  {
    path: ':domain/facts/:id/start',
    name: 'facts/start',
    component: () =>
      import(/* webpackChunkName: "facts-activity" */ './components/start.vue'),
  },
];
