export type RouteNode = {
    path: string;
    [key: string]: RouteNode | string;
};

export type RouteMap = {
    [route: string]: RouteNode;
};

export type ExtractParams<T extends string> =
    T extends `${string}[${infer Param}]${infer Rest}`
    ? Param | ExtractParams<Rest>
    : never;

export type GetRouteParams<T extends RouteNode | string> =
    T extends RouteNode ? ExtractParams<T["path"]> :
    T extends string ? ExtractParams<T> :
    never;

export type ConfigProp = {
    skipNoPageFile: boolean
}