export default [
  {
    path: ':domain/articulation-word/:id/start',
    name: 'articulation-word/start',
    component: () =>
      import(
        /* webpackChunkName: "articulation-word-activity" */ './components/start.vue'
      ),
  },
];
