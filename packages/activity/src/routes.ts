// function activityRoutes() {
//   function requireAll(requireContext) {
//     return requireContext.keys().map(requireContext);
//   }

//   const modules = requireAll(require.context('@libs', true, /.*-activity\/routes$/));
//   let routes = [];

//   modules.forEach(m => (routes = routes.concat(m.default)));

//   return routes;
// }

export default [
  {
    path: 'articulation',
    name: 'articulation',
    component: () =>
      import(
        /* webpackChunkName: "articulation" */ './components/layout/articulation.vue'
      ),
  },
  {
    path: ':domain',
    name: 'domain',
    component: () =>
      import(/* webpackChunkName: "domain" */ './components/layout/domain.vue'),
  },
  {
    path: ':domain/:subdomain',
    name: 'subdomain',
    component: () =>
      import(
        /* webpackChunkName: "subdomain" */ './components/layout/subdomain.vue'
      ),
  },
  {
    path: ':domain/:category/:id',
    name: 'activity',
    component: () =>
      import(
        /* webpackChunkName: "activity" */ './components/layout/activity.vue'
      ),
  },
  // ...activityRoutes()
];
