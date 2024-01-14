import { Routes } from "routes";

/**
 * Returns the path from the hash route if exists else return "/".
 *
 * @returns The path from the hash route.
 * @example
 * localhost:8080/#about -> /about
 * localhost:8080/ -> /
 */
export const getPathFromHashRoute = () => {
  const hash = window.location.hash;
  if (!hash) return "/";
  return "/" + hash.slice(1);
};

/**
 * Resolves a route from a given path.
 * If the route is not found, the default route ("/") value is returned.
 *
 * @param options - The options object.
 * @param options.path - The path to resolve.
 * @param options.routes - The routes object.
 * @returns The resolved route.
 */
export const resolveRouteFromPath = ({
  path,
  routes
}: {
  path: string;
  routes: Routes;
}) => {
  const route = routes[path];
  if (!route) return routes["/"];
  return route;
};

/**
 * Creates a hash router.
 *
 * @param routes - The routes object.
 * @returns A function that accepts a root element and adds load and hashchange event listeners which calls the callback function of the resolved route to inject the content of the page into the root element.
 */
export const createHashRouter = (routes: Routes) => {
  return (rootElement: HTMLElement) => {
    const onChangeRoute = () => {
      // get the route from the address bar
      const path = getPathFromHashRoute();
      // resolve the route and get a callback function of registered route
      const route = resolveRouteFromPath({ path, routes });
      // inject the content of the page
      route.callback(rootElement);
    };

    window.addEventListener("load", onChangeRoute);
    window.addEventListener("hashchange", onChangeRoute);
  };
};
