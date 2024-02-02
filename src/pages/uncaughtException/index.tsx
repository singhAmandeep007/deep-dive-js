import { Playground } from "components";
import { PageProps } from "pages/types";
import { replaceChild, stringToHTML, mount } from "utils";

export const uncaughtExceptionPage = (props: PageProps) => {
  const playgroundId = "playground";

  const htmlTemplate = /* HTML */ ` <h1>Uncaught Exception</h1>
    <div id=${playgroundId}></div>`;

  let element = stringToHTML(htmlTemplate).node;

  replaceChild({
    targetElement: props.targetElement,
    element
  });

  mount({
    id: playgroundId,
    children: (
      <Playground
        files={{ "/eg.ts": { code: "console.log('hello')", hidden: true } }}
      />
    )
  });
};
