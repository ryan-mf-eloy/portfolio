"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { fetchRepoPage, PER_PAGE, type Repo } from "@/lib/github";
import { RepoRow } from "@/components/repo-row";
import { RepoSkeleton } from "@/components/repo-skeleton";
import { RepoTooltip } from "@/components/repo-tooltip";

const TOOLTIP_WIDTH = 320;
const TOOLTIP_GAP = 14;
const TOOLTIP_EST_HEIGHT = 392;
const TOOLTIP_PADDING = 16;
const TOOLTIP_EXIT_MS = 180;

type HoverPhase = "enter" | "exit";
type HoverState = { repo: Repo; style: CSSProperties; phase: HoverPhase } | null;

function computeTooltipStyle(rowRect: DOMRect): CSSProperties {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const width = Math.min(TOOLTIP_WIDTH, viewportWidth - TOOLTIP_PADDING * 2);
  const maxLeft = Math.max(TOOLTIP_PADDING, viewportWidth - width - TOOLTIP_PADDING);
  const preferredLeft = rowRect.left - width - TOOLTIP_GAP;
  const left = Math.min(Math.max(preferredLeft, TOOLTIP_PADDING), maxLeft);
  const preferredTop = rowRect.top + rowRect.height / 2 - TOOLTIP_EST_HEIGHT / 2;
  const maxTop = Math.max(
    TOOLTIP_PADDING,
    viewportHeight - TOOLTIP_EST_HEIGHT - TOOLTIP_PADDING,
  );
  const top = Math.min(Math.max(preferredTop, TOOLTIP_PADDING), maxTop);

  return {
    position: "fixed",
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    zIndex: 80,
  };
}

export function RepoList() {
  const [items, setItems] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [hover, setHover] = useState<HoverState>(null);

  const listRef = useRef<HTMLUListElement>(null);
  const pageRef = useRef(0);
  const loadingRef = useRef(false);
  const doneRef = useRef(false);
  const mountedRef = useRef(true);
  const exitTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      window.clearTimeout(exitTimerRef.current);
    };
  }, []);

  const loadNextRef = useRef<() => void>(undefined);
  loadNextRef.current = async () => {
    if (loadingRef.current || doneRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    const next = pageRef.current + 1;
    try {
      const batch = await fetchRepoPage(next);
      if (!mountedRef.current) return;
      pageRef.current = next;
      setItems((prev) => [...prev, ...batch]);
      if (batch.length < PER_PAGE) {
        doneRef.current = true;
        setDone(true);
      }
    } finally {
      loadingRef.current = false;
      if (mountedRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    loadNextRef.current?.();
  }, []);

  const closeTooltip = () => {
    setHover((current) => {
      if (!current) return null;
      return { ...current, phase: "exit" };
    });
    window.clearTimeout(exitTimerRef.current);
    exitTimerRef.current = window.setTimeout(() => {
      if (mountedRef.current) setHover(null);
    }, TOOLTIP_EXIT_MS);
  };

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      closeTooltip();
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (
          el.scrollTop + el.clientHeight >= el.scrollHeight - 60 &&
          !loadingRef.current &&
          !doneRef.current
        ) {
          loadNextRef.current?.();
        }
        ticking = false;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const handleHover = (repo: Repo, el: HTMLElement) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches
    ) {
      return;
    }
    window.clearTimeout(exitTimerRef.current);
    setHover({
      repo,
      style: computeTooltipStyle(el.getBoundingClientRect()),
      phase: "enter",
    });
  };

  const showSkeleton = items.length === 0 && loading;
  const showFooter = items.length > 0 && (loading || done);

  return (
    <div className="relative min-h-0 flex-1">
      <ul
        ref={listRef}
        className="repo-scroll m-0 h-full min-h-0 list-none p-0"
      >
        {showSkeleton && <RepoSkeleton />}
        {!showSkeleton &&
          items.map((r) => (
            <RepoRow
              key={r.id}
              repo={r}
              onHover={(el) => handleHover(r, el)}
              onLeave={closeTooltip}
            />
          ))}
        {showFooter && (
          <li className="flex list-none flex-col items-center gap-1.5 py-4">
            {loading ? (
              <>
                <span className="loading-bar" aria-hidden />
                <span className="tui-mono text-[10px] uppercase text-oz-text-dim">
                  LOADING MORE
                </span>
              </>
            ) : (
              <span className="tui-mono text-[11px] text-oz-text-dim">
                — end of history —
              </span>
            )}
          </li>
        )}
      </ul>
      {hover && typeof document !== "undefined" && createPortal(
        <RepoTooltip
          key={hover.repo.id}
          repo={hover.repo}
          style={hover.style}
          phase={hover.phase}
        />,
        document.body,
      )}
    </div>
  );
}
