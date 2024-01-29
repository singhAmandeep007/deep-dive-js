export function injectStyles(styles: string) {
  // create a style element
  const styleElement = document.createElement("style");

  // set the content of the style element
  styleElement.textContent = styles;

  // append the style element to the head of the document
  document.head.appendChild(styleElement);
}

export type InjectElementProps = {
  element: HTMLElement | HTMLCollection | Element;
  targetElement: HTMLElement;
  position: "prepend" | "append";
};
/**
 * Injects an element into a target element at a specified position.
 * If the element is an HTMLCollection, it is converted to an array before injection.
 *
 * @param element - The element to be injected.
 * @param targetElement - The target element where the injection will occur.
 * @param position - The position at which the element will be injected.
 */
export const injectElement = ({
  element,
  targetElement,
  position
}: InjectElementProps) => {
  if (element instanceof HTMLCollection) {
    //https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
    targetElement[position](...Array.from(element));
  } else {
    targetElement[position](element);
  }
};

/**
 * Converts a string of HTML into a DOM element.
 * @param html - The HTML string to convert.
 * @param trim - Optional. Indicates whether to trim the HTML string. Default is true.
 * @returns An object containing the template element and its child nodes.
 */
export function stringToHTML(html: string, trim = true) {
  // process the HTML string.
  html = trim ? html : html.trim();

  // then set up a new template element.
  const template = document.createElement("template");
  template.innerHTML = html;
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement/content
  const node = template.content.children;

  return {
    template,
    node
  };
}

/**
 * Replaces the children of a target element with a new element.
 * If the target element has existing children, they are replaced with the new element.
 * If the target element has no children, the new element is appended to the target element.
 *
 * @param element - The element or collection of elements to be inserted.
 * @param targetElement - The target element whose children will be replaced.
 */
export function replaceChild({
  element,
  targetElement
}: {
  element: HTMLElement | HTMLCollection | Element;
  targetElement: HTMLElement;
}) {
  // if there are children in the target element, replace them with the new element
  if (targetElement.children.length > 0) {
    if (element instanceof HTMLCollection || element instanceof Array) {
      // https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
      // targetElement.replaceWith(...Array.from(element));
      targetElement.replaceChildren(...Array.from(element));
    } else {
      // targetElement.replaceWith(element);
      targetElement.replaceChildren(element);
    }
  } else {
    injectElement({
      element,
      targetElement,
      position: "append"
    });
  }
}

/**
 * Inserts a component into the DOM. Uses Shadow DOM.
 * Benifits of using Shadow DOM:
 * - DOM tree encapsulation: The component's DOM tree is encapsulated.
 * - Style encapsulation: The component's styles are encapsulated.
 *
 * @param {Object} options - The options for inserting the component.
 * @param {string} options.htmlTemplate - The HTML template for the component.
 * @param {string} options.cssStyles - The CSS styles for the component.
 * @param {HTMLElement | Element} options.hostElement - The host element where the component will be inserted.
 * @param {(rootElement: HTMLElement) => void} options.onRender - The callback function to be called after the component is rendered.
 * @param {boolean} [options.trim=true] - Whether to trim the HTML template or not.
 */
export function insertComponent({
  htmlTemplate,
  cssStyles,
  hostElement,
  onRender,
  trim = true
}: {
  htmlTemplate: string;
  cssStyles: string;
  hostElement: HTMLElement | Element;
  onRender: (rootElement: HTMLElement) => void;
  trim?: boolean;
}) {
  // process the HTML string.
  htmlTemplate = trim ? htmlTemplate : htmlTemplate.trim();

  // then set up a new template element.
  const template = document.createElement("template");
  // inject styles and HTML into the template
  template.innerHTML = `<style>${cssStyles}</style>${htmlTemplate}`;

  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement/content
  let node: HTMLCollection | Element = template.content.children;
  // then return either an HTMLElement or HTMLCollection,
  // based on whether the input HTML had one or more roots.
  if (node.length === 1) {
    node = node[0];
  }

  // create a shadow DOM
  const shadowRoot = hostElement.attachShadow({ mode: "open" });

  shadowRoot.appendChild(template.content);

  onRender(hostElement as HTMLElement);
}
