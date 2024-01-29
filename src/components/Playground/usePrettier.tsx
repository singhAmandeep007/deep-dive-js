import { useCallback, RefObject } from "react";

import { format } from "prettier/standalone";
import * as prettierPluginBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettierPluginHtml from "prettier/plugins/html";
import * as prettierPluginMarkdown from "prettier/plugins/markdown";
import * as prettierPluginTypescript from "prettier/plugins/typescript";
import * as prettierPluginCss from "prettier/plugins/postcss";

import { CodeMirrorRef } from "@codesandbox/sandpack-react/components/CodeEditor/CodeMirror";

const prettierConfig: Partial<Parameters<typeof format>>[1] = {
  useTabs: false,
  printWidth: 80,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "none",
  singleAttributePerLine: true
};

export const usePrettier = ({
  codeMirrorInstance
}: {
  codeMirrorInstance: RefObject<CodeMirrorRef> | null;
}) => {
  const runPrettier = useCallback(
    ({
      activeFile,
      activeCode,
      updateActiveCode
    }: {
      activeFile: string;
      activeCode: string;
      updateActiveCode: (code: string, ...prop: any) => void;
    }) => {
      console.log(activeFile);
      try {
        /**
         * I would recomend to run this process in a Worker
         */
        format(activeCode, {
          // parser: "babel-ts",
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
        })
          .then((formattedCode) => {
            if (codeMirrorInstance?.current) {
              const cmInstance = codeMirrorInstance.current.getCodemirror();
              console.log(codeMirrorInstance.current, cmInstance);
              if (cmInstance) {
                const trans = cmInstance.state.update({
                  selection: cmInstance.state.selection,
                  changes: {
                    from: 0,
                    to: cmInstance.state.doc.length,
                    insert: formattedCode
                  }
                });
                // cmInstance.update([trans]);

                return formattedCode;
              }
            }
          })
          .then((formattedCode) => {
            updateActiveCode(formattedCode as string);
          });
      } catch {}
    },
    [codeMirrorInstance?.current]
  );

  return {
    runPrettier
  };
};
