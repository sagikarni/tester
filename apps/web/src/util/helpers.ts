export function camel(str: string) {
  const camel = (str || '').replace(/-([^-])/g, (g) => g[1].toUpperCase());

  return capitalize(camel);
}

export function camelActual(str: string) {
  return (str || '').replace(/-(\w)/g, (_: any, c: any) => (c ? c.toUpperCase() : ''));
}

// export function kebab(str: string) {
//   return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
// }

export function capitalize(str: string) {
  str = str || '';

  return `${str.substr(0, 1).toUpperCase()}${str.slice(1)}`;
}

// export function shortId(id: any) {
//   // atob() but for node
//   const arr = Buffer.from(id, 'base64')
//     .toString('binary')
//     .split('/');
//   return arr[arr.length - 1];
// }

// export function getLongId(id) {
//   // btoa() but for node
//   return Buffer.from(`gid://shopify/Product/${id}`, 'binary').toString(
//     'base64',
//   );
// }

// export function findProduct(store: any, id: any) {
//   return store.state.store.products.find((p) => p.id === id);
// }

// export function isOnSale(variants) {
//   return variants.some((variant) => {
//     return parseFloat(variant.price) < parseFloat(variant.compareAtPrice);
//   });
// }

// export function randomNumber(min, max) {
//   return Math.floor(Math.random() * max) + min;
// }

// export function randomString(length = 5) {
//   let text = '';
//   const possible =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }

//   return text;
// }

// // Must be called in Vue context
// export function goTo(id) {
//   this.$vuetify.goTo(id).then(() => {
//     if (!id) {
//       return (document.location.hash = '');
//     }

//     if (history.replaceState) {
//       history.replaceState(null, null, id);
//     } else {
//       document.location.hash = id;
//     }
//   });
// }
