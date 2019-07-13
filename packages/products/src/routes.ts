export default [
  {
    path: '/pricing',
    name: 'pricing',
    component: () =>
      import(
        /* webpackChunkName: "pricing" */ './components/layout/pricing.vue'
      ),
  },
];
