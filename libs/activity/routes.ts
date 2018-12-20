function activityRoutes() {
  function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
  }

  const modules = requireAll(require.context('@libs', true, /.*-activity\/routes$/));
  let routes = [];

  modules.forEach(m => (routes = routes.concat(m.default)));

  return routes;
}

export default [
  {
    path: ':overview',
    name: 'overview',
    component: () => import(/* webpackChunkName: "overview" */ './components/layout/overview.vue')
  },
  {
    path: ':overview/:category',
    name: 'category',
    component: () => import(/* webpackChunkName: "category" */ './components/layout/category.vue')
  },
  {
    path: ':overview/:category/:id',
    name: 'activity',
    component: () => import(/* webpackChunkName: "activity" */ './components/layout/activity.vue')
  },
  ...activityRoutes()
];
