import { RouteNode } from "./types";

const getRoute = (
    routeObj: RouteNode | string,
    params: { [key: string]: string | number } = {}
): string => {

    if (typeof routeObj === "string") return routeObj;

    let path = routeObj.path;

    Object.keys(params).forEach((key) => {
        path = path.replace(`[${key}]`, String(params[key]));
    });

    return path;
};

export { getRoute }