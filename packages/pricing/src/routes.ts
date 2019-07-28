export default [
  {
    path: '/pricing',
    name: 'pricing',
    component: () =>
      import(
        /* webpackChunkName: "pricing" */ './components/layout/pricing.vue'
      ),
  },
  {
    path: '/pricing/:plan',
    name: 'plan',
    component: () =>
      import(/* webpackChunkName: "plan" */ './components/layout/plan.vue'),
  },
];
