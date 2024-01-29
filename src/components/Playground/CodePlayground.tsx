import React, { useCallback, useEffect, useRef } from "react";
import clsx from "clsx";

import {
  UnstyledOpenInCodeSandboxButton,
  useSandpack,
  useActiveCode
} from "@codesandbox/sandpack-react";

import formatSvg from "assets/img/format.svg";
import linkSvg from "assets/img/link.svg";

import { Preview } from "./Preview";
import { Editor } from "./Editor";

import { usePrettier } from "./usePrettier";

import styles from "./codePlayground.module.css";
import commonStyles from "./common.module.css";

export const CodePlayground = ({ label = "Playground" }) => {
  const codeMirrorInstance = useRef(null);

  const { runPrettier } = usePrettier({ codeMirrorInstance });

  const {
    sandpack: { activeFile }
  } = useSandpack();
  const { code: activeCode, updateCode: updateActiveCode } = useActiveCode();

  const format = useCallback(() => {
    console.log("format");
    runPrettier({ activeFile, activeCode, updateActiveCode });
  }, [activeCode, activeFile, runPrettier, updateActiveCode]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <p className={styles.title}>{label}</p>
          <div className={styles.actionWrapper}>
            <abbr title="Format code using Prettier">
              <button
                className={clsx(commonStyles.button, commonStyles.iconButton)}
                onClick={format}
              >
                <img src={formatSvg} />
              </button>
            </abbr>
            <abbr title="Open in CodeSandbox">
              <UnstyledOpenInCodeSandboxButton
                className={clsx(commonStyles.button, commonStyles.iconButton)}
              >
                <img src={linkSvg} />
              </UnstyledOpenInCodeSandboxButton>
            </abbr>
          </div>
        </header>
        <Editor ref={codeMirrorInstance} />
        <Preview />
      </div>
    </div>
  );
};
