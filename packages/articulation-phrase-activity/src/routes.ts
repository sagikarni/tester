export default [
  {
    path: ':domain/articulation-phrase/:id/start',
    name: 'articulation-phrase/start',
    component: () =>
      import(
        /* webpackChunkName: "articulation-phrase-activity" */ './components/start.vue'
      ),
  },
];
