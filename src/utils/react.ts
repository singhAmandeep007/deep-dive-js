import { createRoot } from "react-dom/client";

export const mount = ({
  id,
  children
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const rootElement = document.getElementById(id);

  if (!rootElement) throw new Error(`Element with id ${id} not found.`);

  const root = createRoot(rootElement);
  root.render(children);
};
