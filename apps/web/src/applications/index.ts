// import('./routes')
// const requireApplicationRoutes = require.context('./', true, /routes.js$/);

const requireApplicationRoutes = import('./home/routes');
// const requireApplicationStore = require.context('./', true, /vuex.ts$/);

let routes: any = [];

// const fileName = requireApplicationRoutes;

routes = () => requireApplicationRoutes.then((r: any) => r.default); // routes.concat(fileName.default);

// keys().forEach((fileName) => {
//   routes = routes.concat(requireApplicationRoutes(fileName).default);
// });

// debugger;

const stores: any = [];

// requireApplicationStore.keys().forEach((fileName) => {
//   stores = stores.concat(requireApplicationStore(fileName).default);
// });

export { routes, stores };
