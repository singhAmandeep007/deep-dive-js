import { PageProps } from "pages/types";
import { replaceChild, stringToHTML } from "utils";

export const memoryLeaksPage = (props: PageProps) => {
  const htmlTemplate = /* HTML */ ` <h1>memoryLeaksPage</h1>
    <iframe
      id="iframe"
      style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;border: 1px solid black;"
      title="memoryLeaks"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>`;
  const element = stringToHTML(htmlTemplate).node;

  replaceChild({
    targetElement: props.targetElement,
    element
  });
};
