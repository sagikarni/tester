const requireApplicationRoutes = require.context('./', true, /routes.ts$/, 'lazy');
// const requireApplicationStore = require.context('./', true, /vuex.js$/, 'lazy');

const routes = Promise.all(
  requireApplicationRoutes.keys().map((fileName: string) => requireApplicationRoutes(fileName).then((module: any) => module.default)),
).then(([ modules ]) => modules);

// requireApplicationRoutes.keys().forEach(async (fileName: any) => {
//   routes = routes.concat( await requireApplicationRoutes(fileName).then((route: any) => route.default));
//   debugger;
//   // routes = routes.concat(.default);
// });

const stores: any = [];

// requireApplicationStore.keys().forEach((fileName) => {
//   stores = stores.concat(requireApplicationStore(fileName).default);
// });

export { routes, stores };
