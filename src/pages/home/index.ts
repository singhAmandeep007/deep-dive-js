import { PageProps } from "pages/types";
import { stringToHTML, replaceChild } from "utils";

export const homePage = (props: PageProps) => {
  const htmlTemplate = /* HTML */ `
    <h1>Home</h1>
    <p>
      Welcome to the Deep Dive project! This project is designed to provide
      in-depth knowledge on various topics through multiple pages. Each page
      represents a different topic, allowing you to explore and learn at your
      own pace.
    </p>
  `;

  const element = stringToHTML(htmlTemplate).node;

  replaceChild({
    targetElement: props.targetElement,
    element
  });
};
