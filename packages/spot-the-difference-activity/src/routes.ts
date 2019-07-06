export default [
  {
    path: ':domain/spot-the-difference/:id/start',
    name: 'spot-the-difference/start',
    component: () =>
      import(
        /* webpackChunkName: "spot-the-difference-activity" */ './components/start.vue'
      ),
  },
];
