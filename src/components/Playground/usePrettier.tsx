import { useCallback, RefObject, useRef } from "react";

import { CodeMirrorRef } from "@codesandbox/sandpack-react/components/CodeEditor/CodeMirror";

import { format } from "prettier/standalone";
import * as prettierPluginBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettierPluginHtml from "prettier/plugins/html";
import * as prettierPluginMarkdown from "prettier/plugins/markdown";
import * as prettierPluginTypescript from "prettier/plugins/typescript";
import * as prettierPluginCss from "prettier/plugins/postcss";

const prettierConfig: Partial<Parameters<typeof format>>[1] = {
  useTabs: false,
  printWidth: 80,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "none",
  singleAttributePerLine: true
};

export const usePrettier = () => {
  const { current: formattedFiles } = useRef<string[]>([]);

  const runPrettier = useCallback(
    ({
      activeFile,
      activeCode,
      force = false,
      updateActiveCode,
      codeMirrorInstance = { current: null }
    }: {
      activeFile: string;
      activeCode: string;
      force?: boolean;
      updateActiveCode?: (code: string, ...prop: any) => void;
      codeMirrorInstance?: RefObject<CodeMirrorRef | null>;
    }) => {
      try {
        // if file is already formatted and force format is false then skip
        const alreadyFormatted = formattedFiles.indexOf(activeFile) !== -1;
        if (alreadyFormatted && !force) {
          return;
        }
        // if file is not already formatted then add it to the formatted files list
        if (!alreadyFormatted) {
          formattedFiles.push(activeFile);
        }
        /**
         * recomended to run this process in a worker
         */
        format(activeCode, {
          filepath: activeFile,
          plugins: [
            prettierPluginEstree,
            prettierPluginHtml,
            prettierPluginBabel,
            prettierPluginTypescript,
            prettierPluginCss,
            prettierPluginMarkdown
          ],
          ...prettierConfig
        }).then((formattedCode) => {
          if (updateActiveCode) {
            updateActiveCode(formattedCode);
          } else {
            if (codeMirrorInstance?.current) {
              const cmInstance = codeMirrorInstance.current.getCodemirror();

              if (cmInstance) {
                const trans = cmInstance.state.update({
                  selection: cmInstance.state.selection,
                  changes: {
                    from: 0,
                    to: cmInstance.state.doc.length,
                    insert: formattedCode
                  }
                });
                cmInstance.update([trans]);
              }
            }
          }
        });
      } catch (e) {
        console.log("Error in Formatting", e);
      }
    },
    []
  );

  return {
    runPrettier
  };
};
