import type {CookieMap} from "bun";

// get params
type ExtractParams<Path extends string> =
  Path extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<`/${Rest}`>
    : Path extends `${infer _Start}:${infer Param}`
      ? Param
      : never;

// https://bun.sh/docs/api/http#routing
interface BunRequest<T extends string = string> extends Request {
  params: Record<T, string>;
  readonly cookies: CookieMap;
}

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";

// Handler: dynamic or method-based
type RouteHandler<Path extends string> =
  | ((req: BunRequest<ExtractParams<Path>>) => Response | Promise<Response>)
  | {
      [method in HTTPMethod]?: (
        req: BunRequest<ExtractParams<Path>>,
      ) => Response | Promise<Response>;
    };

// RouteMap: this will auto-infer the path and the handler
type RouteMap = {
  [path: string]: RouteHandler<any>;
};

export function createApiRoutes<R extends RouteMap>(routes: R): R {
  return routes;
}
