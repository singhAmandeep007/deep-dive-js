import {
  homePage,
  memoryLeaksPage,
  prototypePollutionPage,
  uncaughtExceptionPage
} from "pages";

const targetElement = document.getElementsByTagName("main")![0];

export type Route = {
  href: `#${string}`;
  callback: () => void;
  name: string;
};
export type Routes = {
  [key: string]: Route;
};

export const routes: Routes = {
  "/": {
    href: "#",
    callback: () => {
      homePage({ targetElement });
    },
    name: "Home"
  },
  "/prototypePollution": {
    href: "#prototypePollution",
    callback: () => {
      prototypePollutionPage({ targetElement });
    },
    name: "Prototype Pollution"
  },
  "/memoryLeak": {
    href: "#memoryLeak",
    callback: () => {
      memoryLeaksPage({ targetElement });
    },
    name: "Memory Leak"
  },
  "/uncaughtException": {
    href: "#uncaughtException",
    callback: () => {
      uncaughtExceptionPage({ targetElement });
    },
    name: "Uncaught Exception"
  }
};

/**
 * Generates an array of route names and their corresponding hrefs.
 * @returns An array of objects containing the name and href of each route.
 * @example
 * const ROUTES_NAME_HREF =
 *    [{
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
