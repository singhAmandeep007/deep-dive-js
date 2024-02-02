import React, { useState } from "react";
import clsx from "clsx";

import { SandpackPreview, SandpackConsole } from "@codesandbox/sandpack-react";

import refreshSvg from "assets/img/refresh.svg";

import styles from "./preview.module.css";
import commonStyles from "./common.module.css";

const previewTabs = {
  result: "result",
  console: "console"
} as const;

type PreviewTab = keyof typeof previewTabs;

export type PreviewProps = {
  isRefreshDisabled?: boolean;
  onRefresh?: () => void;
};

export const Preview = ({
  isRefreshDisabled = false,
  onRefresh
}: PreviewProps) => {
  const [selectedPreviewTab, setSelectedPreviewTab] =
    useState<PreviewTab>("result");

  const handleOnChangePreviewTab = (tab: PreviewTab) => {
    setSelectedPreviewTab(tab);
  };

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
              onClick={onRefresh}
              disabled={isRefreshDisabled}
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
