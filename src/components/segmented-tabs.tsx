"use client";

import { useRef, type CSSProperties, type KeyboardEvent } from "react";

export type SegmentedTab<T extends string> = {
  id: T;
  label: string;
};

type Props<T extends string> = {
  idPrefix: string;
  label: string;
  tabs: readonly SegmentedTab<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function tabId(idPrefix: string, id: string): string {
  return `${idPrefix}-tab-${id}`;
}

export function panelId(idPrefix: string, id: string): string {
  return `${idPrefix}-panel-${id}`;
}

export function SegmentedTabs<T extends string>({
  idPrefix,
  label,
  tabs,
  value,
  onChange,
}: Props<T>) {
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === value),
  );
  const style = {
    "--tab-count": tabs.length,
    "--tab-index": activeIndex,
  } as CSSProperties;

  function focusTab(index: number) {
    const next = (index + tabs.length) % tabs.length;
    onChange(tabs[next].id);
    buttonsRef.current[next]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(tabs.length - 1);
        break;
    }
  }

  return (
    <div role="tablist" aria-label={label} className="segmented-tabs" style={style}>
      <span className="segmented-tabs__indicator" aria-hidden="true" />
      {tabs.map((tab, index) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            ref={(node) => {
              buttonsRef.current[index] = node;
            }}
            type="button"
            role="tab"
            id={tabId(idPrefix, tab.id)}
            aria-selected={selected}
            aria-controls={panelId(idPrefix, tab.id)}
            tabIndex={selected ? 0 : -1}
            data-selected={selected}
            className="segmented-tabs__tab tui-mono"
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
