import { replaceChild } from "utils";

import {
  homePage,
  memoryLeaksPage,
  prototypePollutionPage,
  uncaughtExceptionPage
} from "pages";

export type Route = {
  href: `#${string}`;
  callback: (rootElement: HTMLElement) => void;
  name: string;
};
export type Routes = {
  [key: string]: Route;
};

export const routes: Routes = {
  "/": {
    href: "#",
    callback: (targetElement) => {
      replaceChild({
        targetElement,
        element: homePage()
      });
    },
    name: "Home"
  },
  "/prototypePollution": {
    href: "#prototypePollution",
    callback: (targetElement) => {
      replaceChild({
        targetElement,
        element: prototypePollutionPage()
      });
    },
    name: "Prototype Pollution"
  },
  "/memoryLeak": {
    href: "#memoryLeak",
    callback: (targetElement) => {
      replaceChild({
        targetElement,
        element: memoryLeaksPage()
      });
    },
    name: "Memory Leak"
  },
  "/uncaughtException": {
    href: "#uncaughtException",
    callback: (targetElement) => {
      replaceChild({
        targetElement,
        element: uncaughtExceptionPage()
      });
    },
    name: "Uncaught Exception"
  }
};

/**
 * Generates an array of route names and their corresponding hrefs.
 * @returns An array of objects containing the name and href of each route.
 * @example
 * const ROUTES_NAME_HREF = [{
 * 		href: "#",
 * 		name: "Home"
 * 	},
 *		}
 * 		href: "#prototypePollution",
 * 		name: "Prototype Pollution"
 * 	}];
 *
 */
export const ROUTES_NAME_HREF = Object.keys(routes).map((key) => ({
  name: routes[key].name,
  href: routes[key].href
}));
