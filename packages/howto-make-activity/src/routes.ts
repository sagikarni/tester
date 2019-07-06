export default [
  {
    path: ':domain/howto-make/:id/start',
    name: 'howto-make/start',
    component: () =>
      import(
        /* webpackChunkName: "howto-make-activity" */ './components/start.vue'
      ),
  },
];
