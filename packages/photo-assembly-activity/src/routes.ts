export default [
  {
    path: ':overview/photo-assembly/:id/start',
    name: 'photo-assembly/start',
    component: () =>
      import(
        /* webpackChunkName: "photo-assembly-activity" */ './components/start.vue'
      ),
  },
];
