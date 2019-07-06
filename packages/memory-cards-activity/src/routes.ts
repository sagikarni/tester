export default [
  {
    path: ':domain/memory-cards/:id/start',
    name: 'memory-cards/start',
    component: () =>
      import(
        /* webpackChunkName: "memory-cards-activity" */ './components/start.vue'
      ),
  },
];
