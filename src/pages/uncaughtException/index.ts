import { stringToHTML } from "utils";

export const uncaughtExceptionPage = () => {
  const htmlTemplate = /* HTML */ ` <h1>uncaughtExceptionPage</h1> `;
  return stringToHTML(htmlTemplate).node;
};
