import { generateRouteMap } from "./routeMapGenerator";

export * from "./functions";
export * from "./types";
export * from "./routeMapGenerator";


//? Sample Route map
//   export const routeMap: RouteMap = {
//     home: {
//       path: '/home',
//     },
//     products: {
//       path: '/products',
//       details: {
//         path: '/products/[product-id]',
//       },
//     },
//     userProfile: {
//       path: '/users/[user-id]',
//     },
//   };

//? Sample usages
//   getRoute(routeMap.home, {});
//   getRoute(routeMap.products, {});
//   getRoute(routeMap.products.details, { 'product-id': 12 });
//   getRoute(routeMap.userProfile, { 'user-id': 21 });
