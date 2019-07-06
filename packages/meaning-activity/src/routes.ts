export default [
  {
    path: ':domain/meaning/:id/start',
    name: 'meaning/start',
    component: () =>
      import(
        /* webpackChunkName: "meaning-activity" */ './components/start.vue'
      ),
  },
];
