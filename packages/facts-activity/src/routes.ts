export default [
  {
    path: ':overview/facts/:id/start',
    name: 'facts/start',
    component: () =>
      import(/* webpackChunkName: "facts-activity" */ './components/start.vue'),
  },
];
