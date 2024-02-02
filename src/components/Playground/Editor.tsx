import React, { forwardRef } from "react";

import {
  SandpackFileExplorer,
  SandpackCodeEditor
} from "@codesandbox/sandpack-react";
import { CodeMirrorRef } from "@codesandbox/sandpack-react/components/CodeEditor/CodeMirror";

import styles from "./editor.module.css";

export const Editor = forwardRef<CodeMirrorRef | null>(
  (props, codeMirrorInstance) => {
    return (
      <div className={styles.editorWrapper}>
        <SandpackFileExplorer className={styles.fileExplorer} />
        <SandpackCodeEditor
          ref={codeMirrorInstance}
          closableTabs
          showLineNumbers
          wrapContent={false}
          showInlineErrors={true}
          className={styles.codeEditor}
          // not working in sandpack for some reason
          // additionalLanguages={[
          //   {
          //     name: "python",
          //     extensions: ["py"],
          //     language: python()
          //   }
          // {
          //   name: "markdown",
          //   extensions: ["md"],
          //   language: markdown()
          // }
          // ]}
        />
      </div>
    );
  }
);
