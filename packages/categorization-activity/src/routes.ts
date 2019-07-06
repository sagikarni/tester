export default [
  {
    path: ':domain/categorization/:id/start',
    name: 'categorization/start',
    component: () =>
      import(
        /* webpackChunkName: "categorization-activity" */ './components/start.vue'
      ),
  },
];
