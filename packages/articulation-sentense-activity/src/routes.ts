export default [
  {
    path: ':domain/articulation-sentense/:id/start',
    name: 'articulation-sentense/start',
    component: () =>
      import(
        /* webpackChunkName: "articulation-sentense-activity" */ './components/start.vue'
      ),
  },
];
