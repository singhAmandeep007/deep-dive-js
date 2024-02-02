import {
  SandpackProvider,
  SandpackProviderProps
} from "@codesandbox/sandpack-react";

import { CodePlayground } from "./CodePlayground";

/**
 *
 * IMP: template other than react-ts does not behave as expected.
 * Have issues with other presets and even custom setup.
 */
export function Playground({
  files = {},
  options,
  label,
  customSetup = {},
  template = "vanilla-ts"
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
        ...customSetup
      }}
      files={files}
      options={{
        autorun: true,
        ...options
      }}
      template={template}
    >
      <CodePlayground label={label} />
    </SandpackProvider>
  );
}
