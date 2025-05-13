// Recursive type for a route node
export type RouteNode = {
    path: string;
    [key: string]: RouteNode | string; // subdirectories keys mapped to RouteNode
};

// Top-level type for the route map
export type RouteMap = {
    [route: string]: RouteNode;
};

export type ConfigProp = {
    skipNoPageFile: boolean
}