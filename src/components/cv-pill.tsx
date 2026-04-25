"use client";

import { useCallback, useState, type SVGProps } from "react";

type PillState = "idle" | "generating" | "done" | "error";

const DONE_RESET_MS = 1800;
const ERROR_RESET_MS = 2400;

const COPY: Record<PillState, { label: string; meta: string }> = {
  idle: { label: "Download resume", meta: "PDF" },
  generating: { label: "Generating PDF…", meta: "one moment" },
  done: { label: "Downloaded", meta: "ryan-eloy-resume.pdf" },
  error: { label: "Couldn't generate", meta: "Tap to try again" },
};

function DownloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

function SpinnerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      aria-hidden
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.36-8.6" />
    </svg>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M5 12.5l4 4L19 7" />
    </svg>
  );
}

function ErrorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M12 8v5M12 16.5h.01M3 18.5L12 4l9 14.5z" />
    </svg>
  );
}

export function CvPill() {
  const [state, setState] = useState<PillState>("idle");
  const isGenerating = state === "generating";
  const copy = COPY[state];

  const handleClick = useCallback(async () => {
    if (state !== "idle" && state !== "error") return;
    setState("generating");
    let objectUrl: string | undefined;
    try {
      const res = await fetch("/api/resume", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = "ryan-eloy-resume.pdf";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setState("done");
      setTimeout(() => setState("idle"), DONE_RESET_MS);
    } catch (err) {
      console.error("[cv-pill] download failed:", err);
      setState("error");
      setTimeout(() => setState("idle"), ERROR_RESET_MS);
    } finally {
      if (objectUrl) {
        setTimeout(() => URL.revokeObjectURL(objectUrl!), 1500);
      }
    }
  }, [state]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isGenerating}
      aria-busy={isGenerating}
      className={`cv-pill cv-pill--${state} mt-[18px] flex w-full shrink-0 items-center gap-3 rounded-[10px] border-0 px-3.5 py-3 text-left text-oz-text disabled:cursor-progress`}
    >
      <span className="cv-pill__icon size-8 shrink-0 rounded-lg">
        <span className="cv-pill__glyph cv-pill__glyph--idle">
          <DownloadIcon />
        </span>
        <span className="cv-pill__glyph cv-pill__glyph--generating">
          <SpinnerIcon />
        </span>
        <span className="cv-pill__glyph cv-pill__glyph--done">
          <CheckIcon />
        </span>
        <span className="cv-pill__glyph cv-pill__glyph--error">
          <ErrorIcon />
        </span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-px">
        <span className="text-[13px] font-semibold tracking-[-0.01em]" aria-live="polite">
          {copy.label}
        </span>
        <span className="tui-mono text-[10px] tracking-[0.04em] text-oz-text-mute">
          {copy.meta}
        </span>
      </span>
      <span className="cv-pill__progress" aria-hidden />
    </button>
  );
}
