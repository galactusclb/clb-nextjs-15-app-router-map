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
// getRoute(routeMap.home.kk.id.task["task-id"], { "task-id": 1, id: '21' }); //* ✅Valid - matches all parameters
// getRoute(routeMap.home["gg-sub"]["sub-1"]); //* ✅Valid: No parameters allowed for static route
// getRoute(routeMap.home.kk.id.task["task-id"], { "task-id": 1, idx: '21', id: 2 }); //* ❌Error: "idx" not in parameters (There is no dynamic route called 'idx')
// getRoute(routeMap.home["gg-sub"]["sub-1"], { id: '21' }); //* ❌Error: No parameters allowed for static route
//   getRoute(routeMap.products, {});
//   getRoute(routeMap.products.details, { 'product-id': 12 });
//   getRoute(routeMap.userProfile, { 'user-id': 21 });
