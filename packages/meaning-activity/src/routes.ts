export default [
  {
    path: ':overview/meaning/:id/start',
    name: 'meaning/start',
    component: () =>
      import(
        /* webpackChunkName: "meaning-activity" */ './components/start.vue'
      ),
  },
];
