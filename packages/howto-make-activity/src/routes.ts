export default [
  {
    path: ':overview/howto-make/:id/start',
    name: 'howto-make/start',
    component: () =>
      import(
        /* webpackChunkName: "howto-make-activity" */ './components/start.vue'
      ),
  },
];
