export * from "./functions";
export * from "./types";
export * from "./routeMapGenerator";


//? Sample Route map
// import { type RouteMap } from "./types";
// export const routeMap = {
//   "/": {
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
// getRoute(routeMap["/"]["test-group"]["group-sub-1"]["test-id"], { "test-id": true }); //* ✅Valid - matches all parameters
// getRoute(routeMap["/"]["gg-sub"]["sub-1"]); //* ✅Valid: No parameters allowed for static route
// getRoute(routeMap["/"]["test-group"]); //* ✅Valid - matches all parameters
// getRoute(routeMap["/"].kk.id.task["task-id"], { "task-id": 1, "idx": '21', "id": 2 }); //* ❌Error: "idx" not in parameters (There is no dynamic route called 'idx')
// getRoute(routeMap["/"]["gg-sub"]["sub-1"], { "id": '21' }); //* ❌Error: No parameters allowed for static route
