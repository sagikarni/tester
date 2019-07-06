export default [
  {
    path: ':domain/good-story/:id/start',
    name: 'good-story/start',
    component: () =>
      import(
        /* webpackChunkName: "good-story-activity" */ './components/start.vue'
      ),
  },
];
