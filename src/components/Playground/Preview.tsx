import React, { useState } from "react";
import clsx from "clsx";

import {
  SandpackPreview,
  SandpackConsole,
  useSandpack
} from "@codesandbox/sandpack-react";

import refreshSvg from "assets/img/refresh.svg";

import styles from "./preview.module.css";
import commonStyles from "./common.module.css";

const previewTabs = {
  result: "result",
  console: "console"
} as const;

type PreviewTab = keyof typeof previewTabs;

export const Preview = () => {
  const [selectedPreviewTab, setSelectedPreviewTab] =
    useState<PreviewTab>("result");

  const {
    sandpack: { status },
    dispatch
  } = useSandpack();

  const handleOnChangePreviewTab = (tab: PreviewTab) => {
    setSelectedPreviewTab(tab);
  };

  const handleRefresh = () => {
    // sends the refresh message to the bundler, should be logged by the listener
    dispatch({ type: "refresh" });
  };

  const isRefeshDisabled = status === "idle";

  const isResultTabSelected = selectedPreviewTab === previewTabs.result;
  const isConsoleTabSelected = selectedPreviewTab === previewTabs.console;

  return (
    <div className={styles.previewContainer}>
      <div className={styles.previewNav}>
        <button
          className={clsx(commonStyles.button, styles.previewNavButton, {
            [styles.selected]: isResultTabSelected
          })}
          onClick={() => handleOnChangePreviewTab("result")}
        >
          Result
        </button>
        <button
          className={clsx(commonStyles.button, styles.previewNavButton, {
            [styles.selected]: isConsoleTabSelected
          })}
          onClick={() => handleOnChangePreviewTab("console")}
        >
          Console
        </button>
        <div className={styles.refresh}>
          <abbr title="Refresh pane">
            <button
              className={clsx(commonStyles.button, commonStyles.iconButton)}
              onClick={handleRefresh}
              disabled={isRefeshDisabled}
            >
              <img src={refreshSvg} />
            </button>
          </abbr>
        </div>
      </div>
      <div className={styles.previewWrapper}>
        <SandpackPreview
          showNavigator={false}
          showOpenInCodeSandbox={false}
          className={clsx(
            {
              [styles.hide]: !isResultTabSelected
            },
            styles.preview
          )}
          showRefreshButton={false}
        />

        <SandpackConsole
          className={clsx({
            [styles.hide]: !isConsoleTabSelected
          })}
          resetOnPreviewRestart={true}
        />
      </div>
    </div>
  );
};
