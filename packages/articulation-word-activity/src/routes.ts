export default [
  {
    path: ':overview/articulation-word/:id/start',
    name: 'articulation-word/start',
    component: () =>
      import(
        /* webpackChunkName: "articulation-word-activity" */ './components/start.vue'
      ),
  },
];
