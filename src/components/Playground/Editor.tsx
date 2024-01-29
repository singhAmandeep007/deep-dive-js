import React, { RefObject, forwardRef, useEffect } from "react";
// import { markdown } from "@codemirror/lang-markdown";
// import { EditorSelection } from "@codemirror/state";
// import { EditorView } from "@codemirror/view";

import {
  SandpackFileExplorer,
  SandpackCodeEditor
} from "@codesandbox/sandpack-react";
import { CodeMirrorRef } from "@codesandbox/sandpack-react/components/CodeEditor/CodeMirror";

import styles from "./editor.module.css";

export const Editor = forwardRef<CodeMirrorRef | null>(
  (props, codeMirrorInstance) => {
    // useEffect(() => {
    //   if (codeMirrorInstance?.current) {
    //     // Getting CodeMirror instance
    //     const cmInstance = codeMirrorInstance.current.getCodemirror() as
    //       | EditorView
    //       | undefined;

    //     if (!cmInstance) return;
    //     console.log(cmInstance);

    // 		const trans = cmInstance.state.update({
    //       selection: cmInstance.state.selection,
    //       changes: {
    //         from: 0,
    //         to: cmInstance.state.doc.length,
    //         insert: prettierCode
    //       }
    //     });

    //     cmInstance.update([trans]);

    //     // cmInstance.update([trans]);
    //   }
    // }, [codeMirrorInstance]);

    /**
 * additionalLanguages={[
            {
              name: "markdown",
              extensions: ["md"],
              language: markdown()
            }
          ]}
 */

    return (
      <div className={styles.editorWrapper}>
        <SandpackFileExplorer className={styles.fileExplorer} />
        <SandpackCodeEditor
          ref={codeMirrorInstance}
          closableTabs
          showLineNumbers
          wrapContent={false}
          className={styles.codeEditor}
        />
      </div>
    );
  }
);
