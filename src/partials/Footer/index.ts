import { stringToHTML, injectElement, InjectElementProps } from "utils";

import * as classes from "./footer.module.css";

/**
 * Creates a navbar component and appends it to the specified target element at given position.
 * @param options - The configuration options for the navbar.
 * @param options.targetElement - The target element to append the navbar to. Defaults to `document.body`.
 * @param options.position - The position to insert the navbar in the target element. Defaults to "append".
 */
export const createFooter = ({
  targetElement = document.body,
  position = "append"
}: {
  targetElement?: HTMLElement;
  position?: InjectElementProps["position"];
} = {}) => {
  const htmlTemplate = /* HTML */ `
    <footer class=${classes.footer}>
      <p>Deep Dive by Amandeep Singh © 2023</p>
    </footer>
  `;

  function render() {
    const footerElement = stringToHTML(htmlTemplate).node[0] as HTMLElement;

    // inject footer into target
    injectElement({
      element: footerElement,
      targetElement,
      position
    });
  }
  return {
    render
  };
};
