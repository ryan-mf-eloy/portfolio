"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "ryan-theme";

function getSystemTheme(): Theme {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
}

function getResolvedTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const storedTheme =
    typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
  const rootTheme = document.documentElement.dataset.theme;

  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
  if (rootTheme === "light" || rootTheme === "dark") return rootTheme;

  return getSystemTheme();
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTheme(getResolvedTheme());
    const frame = window.requestAnimationFrame(() => setIsReady(true));

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = () => {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setTheme(media.matches ? "dark" : "light");
      }
    };

    media.addEventListener("change", syncSystemTheme);

    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener("change", syncSystemTheme);
    };
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";

  function handleToggle() {
    document.documentElement.dataset.themeAnimating = "true";
    window.setTimeout(() => {
      delete document.documentElement.dataset.themeAnimating;
    }, 420);

    applyTheme(nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button
      type="button"
      className="theme-toggle pointer-events-auto"
      data-theme={theme}
      data-ready={isReady ? "true" : "false"}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      onClick={handleToggle}
    >
      <svg
        className="theme-toggle__icon"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <g className="theme-toggle__sun" stroke="currentColor" strokeLinecap="round">
          <circle className="theme-toggle__sun-core" cx="12" cy="12" r="4.15" />
          <path className="theme-toggle__ray theme-toggle__ray--1" d="M12 2.9v2" />
          <path className="theme-toggle__ray theme-toggle__ray--2" d="m18.45 5.55-1.42 1.42" />
          <path className="theme-toggle__ray theme-toggle__ray--3" d="M21.1 12h-2" />
          <path className="theme-toggle__ray theme-toggle__ray--4" d="m18.45 18.45-1.42-1.42" />
          <path className="theme-toggle__ray theme-toggle__ray--5" d="M12 21.1v-2" />
          <path className="theme-toggle__ray theme-toggle__ray--6" d="m5.55 18.45 1.42-1.42" />
          <path className="theme-toggle__ray theme-toggle__ray--7" d="M2.9 12h2" />
          <path className="theme-toggle__ray theme-toggle__ray--8" d="m5.55 5.55 1.42 1.42" />
        </g>

        <g className="theme-toggle__moon" stroke="currentColor" strokeLinecap="round">
          <path
            className="theme-toggle__moon-body"
            d="M16.92 14.62A6.72 6.72 0 0 1 9.38 7.08a6.92 6.92 0 1 0 7.54 7.54Z"
          />
          <circle className="theme-toggle__crater theme-toggle__crater--1" cx="14.3" cy="14.1" r="0.62" />
          <circle className="theme-toggle__crater theme-toggle__crater--2" cx="11.2" cy="16.1" r="0.42" />
          <circle className="theme-toggle__crater theme-toggle__crater--3" cx="15.9" cy="10.9" r="0.34" />
        </g>

        <g className="theme-toggle__stars" fill="currentColor">
          <circle className="theme-toggle__star theme-toggle__star--1" cx="5.2" cy="6.2" r="0.7" />
          <circle className="theme-toggle__star theme-toggle__star--2" cx="18.6" cy="4.7" r="0.52" />
          <circle className="theme-toggle__star theme-toggle__star--3" cx="19.1" cy="18.9" r="0.62" />
        </g>
      </svg>
    </button>
  );
}
