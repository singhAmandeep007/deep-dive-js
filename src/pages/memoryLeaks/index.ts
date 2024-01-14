import { stringToHTML } from "utils";

export const memoryLeaksPage = () => {
  const htmlTemplate = /* HTML */ ` <h1>memoryLeaksPage</h1> `;
  return stringToHTML(htmlTemplate).node;
};
