import { stringToHTML, injectElement, InjectElementProps } from "utils";

import * as classes from "./navbar.module.css";

import { Route } from "routes";

/**
 * Creates a navbar component and appends it to the specified target element at given position.
 * @param options - The configuration options for the navbar.
 * @param options.targetElement - The target element to append the navbar to. Defaults to `document.body`.
 * @param options.position - The position to insert the navbar in the target element. Defaults to "append".
 * @param options.routes - The routes to generate navigation links for in the navbar.
 */
export function createNavbar({
  targetElement = document.body,
  position = "prepend",
  routes = []
}: {
  targetElement?: HTMLElement;
  position?: InjectElementProps["position"];
  routes?: Pick<Route, "href" | "name">[];
} = {}) {
  const htmlTemplate = /* HTML */ ` <nav class=${classes.navbar}>
    <a
      href="#"
      class=${classes.logo}
      >Js</a
    >

    <ul class=${classes.navMenu}>
      ${routes
        .map((route) => {
          return /* HTML */ `<li class=${classes.navItem}>
            <a
              href=${route.href}
              class=${classes.navLink}
              >${route.name}</a
            >
          </li>`;
        })
        .join("")}
    </ul>

    <div class=${classes.hamburger}>
      <span class=${classes.bar}></span>
      <span class=${classes.bar}></span>
      <span class=${classes.bar}></span>
    </div>
  </nav>`;

  const onRender = (rootElement: HTMLElement) => {
    const hamburger = rootElement!.querySelector(`.${classes.hamburger}`);
    const navMenu = rootElement!.querySelector(`.${classes.navMenu}`);
    // toggle classes on hamburger and navMenu when hamburger is clicked
    hamburger!.addEventListener("click", () => {
      hamburger!.classList.toggle(classes.active);
      navMenu!.classList.toggle(classes.active);
    });
    // remove active classes on hamburger and navMenu when  any navLink is clicked
    rootElement!.querySelectorAll(`.${classes.navLink}`).forEach((n) =>
      n.addEventListener("click", (el) => {
        // remove classes
        hamburger!.classList.remove(classes.active);
        navMenu!.classList.remove(classes.active);
      })
    );
  };

  function render() {
    const navbarElement = stringToHTML(htmlTemplate).node[0] as HTMLElement;

    // inject navbar into target
    injectElement({
      element: navbarElement,
      targetElement,
      position
    });

    onRender(navbarElement);
  }

  return {
    render
  };
}
