import {
  SandpackProvider,
  SandpackProviderProps
} from "@codesandbox/sandpack-react";

import { CodePlayground } from "./CodePlayground";

export function Playground({
  files = {},
  template = "react",
  options,
  label,
  customSetup = {}
}: Pick<
  SandpackProviderProps,
  "files" | "template" | "options" | "customSetup"
> & {
  label?: string;
}) {
  return (
    <SandpackProvider
      theme="dark"
      customSetup={{
        entry: "./index.ts",
        ...customSetup
      }}
      files={files}
      options={{
        autorun: true,
        activeFile: "./index.ts",
        ...options
      }}
      template={template}
    >
      <CodePlayground label={label} />
    </SandpackProvider>
  );
}
