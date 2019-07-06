export default [
  {
    path: ':domain/zoom/:id/start',
    name: 'zoom/start',
    component: () =>
      import(/* webpackChunkName: "zoom-activity" */ './components/start.vue'),
  },
];
