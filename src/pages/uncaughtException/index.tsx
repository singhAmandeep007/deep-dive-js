import { Playground } from "components";
import { PageProps } from "pages/types";
import { replaceChild, stringToHTML, mount } from "utils";

export const uncaughtExceptionPage = (props: PageProps) => {
  const playgroundId = "playground";

  const htmlTemplate = /* HTML */ ` <h1>uncaughtExceptionPage</h1>
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
        files={{ "/index.ts": { code: "type f = {}", hidden: true } }}
      />
    )
  });
};
