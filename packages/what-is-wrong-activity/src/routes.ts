export default [
  {
    path: ':overview/plain-slides/:id/start',
    name: 'plain-slides/start',
    component: () =>
      import(/* webpackChunkName: "learning-activity" */ './components/start.vue'),
  },
];
