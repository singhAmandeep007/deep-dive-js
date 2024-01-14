import { createNavbar, createFooter } from "partials";

import { createHashRouter } from "modules/router";

import { ROUTES_NAME_HREF, routes } from "routes";

import "../styles.css";

const appElement = document.getElementById("app")!;

const mainElement = document.getElementsByTagName("main")![0];

createHashRouter(routes)(mainElement);

createNavbar({
  routes: ROUTES_NAME_HREF,
  position: "prepend",
  targetElement: appElement
}).render();

createFooter({
  position: "append",
  targetElement: appElement
}).render();
