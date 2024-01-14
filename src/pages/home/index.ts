import { stringToHTML } from "utils";

export const homePage = () => {
  const htmlTemplate = /* HTML */ Array.from({ length: 10 })
    .map(
      () => `
		<h1>Home</h1>
		
	`
    )
    .join("");
  return stringToHTML(htmlTemplate).node;
};
