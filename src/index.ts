import { getRoute } from "./functions";
import { routeMap } from "./routeMap";
import { generateRouteMap } from "./routeMapGenerator";

export * from "./functions";
export * from "./types";
export * from "./routeMapGenerator";


//? Sample Route map
// import { type RouteMap } from "./types";
// export const routeMap = {
//   "home": {
//     "path": "/",
//     "gg-sub": {
//       "path": "/gg-sub",
//       "public-dir": {
//         "path": "/gg-sub/public-dir"
//       },
//       "sub-1": {
//         "path": "/gg-sub/sub-1"
//       }
//     },
//     "kk": {
//       "path": "/kk",
//       "id": {
//         "path": "/kk/[id]",
//         "task": {
//           "path": "/kk/[id]/task",
//           "task-id": {
//             "path": "/kk/[id]/task/[task-id]"
//           }
//         }
//       }
//     },
//     "test-group": {
//       "path": "/test-group",
//       gg : 'sds',
//       "group-sub-1": {
//         "path": "/test-group/(group)/group-sub-1",
//         "test": {
//           "path": "/test-group/(group)/group-sub-1/test"
//         }
//       },
//       "group-sub-2": {
//         "path": "/test-group/(group)/group-sub-2"
//       }
//     }
//   }
// } as const satisfies RouteMap;

//? Sample usages
// getRoute(routeMap.home.kk.id.task["task-id"], { "task-id": 1, id: '21' }); //* ✅Valid - matches all parameters
// getRoute(routeMap.home["gg-sub"]["sub-1"]); //* ✅Valid: No parameters allowed for static route
// getRoute(routeMap.home["test-group"]); //* ✅Valid - matches all parameters
// getRoute(routeMap.home.kk.id.task["task-id"], { "task-id": 1, idx: '21', id: 2 }); //* ❌Error: "idx" not in parameters (There is no dynamic route called 'idx')
// getRoute(routeMap.home["gg-sub"]["sub-1"], { id: '21' }); //* ❌Error: No parameters allowed for static route
