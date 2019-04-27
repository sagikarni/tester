export default [
  {
    path: ':overview/plain/:id/start',
    name: 'plain/start',
    component: () =>
      import(/* webpackChunkName: "plain-activity" */ './components/start.vue'),
  },
];
