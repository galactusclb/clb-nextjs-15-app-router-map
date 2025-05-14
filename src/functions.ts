import { GetRouteParams, RouteNode } from "./types";

const getRoute = <T extends RouteNode>(
    routeObj: T,
    ...params : GetRouteParams<T> extends never ? [] : [{ [K in GetRouteParams<T>]: string | number | boolean }]
): string => {

    if (typeof routeObj === "string") return routeObj;

    let path = routeObj.path;

    console.log(params);
    
    if (params?.[0]) {
        (Object.keys(params[0]) as Array<GetRouteParams<T>>).forEach((key) => {
            path = path.replace(`[${key}]`, String(params[0]?.[key]));
        });
    }

    return path;
};

export { getRoute }