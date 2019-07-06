export default [
  {
    path: ':domain/whats-in-the-picture/:id/start',
    name: 'whats-in-the-picture/start',
    component: () =>
      import(
        /* webpackChunkName: "whats-in-the-picture-activity" */ './components/start.vue'
      ),
  },
];
