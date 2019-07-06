export default [
  {
    path: ':domain/plain/:id/start',
    name: 'plain/start',
    component: () =>
      import(/* webpackChunkName: "plain-activity" */ './components/start.vue'),
  },
];
