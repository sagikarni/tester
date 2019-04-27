export default [
  {
    path: ':overview/sound-of-life-photo/:id/start',
    name: 'sound-of-life-photo/start',
    component: () =>
      import(
        /* webpackChunkName: "sound-of-life-photo-activity" */ './components/start.vue'
      ),
  },
];
