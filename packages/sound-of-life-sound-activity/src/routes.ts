export default [
  {
    path: ':domain/sound-of-life-sound/:id/start',
    name: 'sound-of-life-sound/start',
    component: () =>
      import(
        /* webpackChunkName: "sound-of-life-sound-activity" */ './components/start.vue'
      ),
  },
];
