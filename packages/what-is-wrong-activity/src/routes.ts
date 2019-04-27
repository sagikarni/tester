export default [
  {
    path: ':overview/what-is-wrong/:id/start',
    name: 'what-is-wrong/start',
    component: () =>
      import(
        /* webpackChunkName: "what-is-wrong-activity" */ './components/start.vue'
      ),
  },
];
