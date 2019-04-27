export default [
  {
    path: ':overview/zoom/:id/start',
    name: 'zoom/start',
    component: () =>
      import(/* webpackChunkName: "zoom-activity" */ './components/start.vue'),
  },
];
