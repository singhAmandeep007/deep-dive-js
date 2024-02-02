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
  // can play around with codeMirrorInstance
  const codeMirrorInstance = useRef(null);

  const { runPrettier } = usePrettier();

  const { code: activeCode, updateCode: updateActiveCode } = useActiveCode();

  const {
    sandpack: { activeFile, status },
    dispatch
  } = useSandpack();

  const onRefresh = useCallback(() => {
    dispatch({ type: "refresh" });
  }, []);

  const handleFormat = useCallback(
    (forceFormat: boolean = false) => {
      runPrettier({
        activeFile,
        activeCode,
        updateActiveCode,
        force: forceFormat
      });
    },
    [runPrettier, activeFile, activeCode, updateActiveCode]
  );

  useEffect(() => {
    if (status === "running" && activeFile) {
      handleFormat();
    }
  }, [activeFile, status]);

  const isRefreshDisabled = status === "idle";

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <p className={styles.title}>{label}</p>
          <div className={styles.actionWrapper}>
            <abbr title="Format code using Prettier">
              <button
                className={clsx(commonStyles.button, commonStyles.iconButton)}
                onClick={() => {
                  handleFormat(true);
                }}
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
        <Preview {...{ onRefresh, isRefreshDisabled }} />
      </div>
    </div>
  );
};
