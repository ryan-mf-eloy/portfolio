"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { fetchRepoPage, PER_PAGE, type Repo } from "@/lib/github";
import { RepoRow } from "@/components/repo-row";
import { RepoSkeleton } from "@/components/repo-skeleton";
import { RepoTooltip } from "@/components/repo-tooltip";

const TOOLTIP_WIDTH = 320;
const TOOLTIP_GAP = 12;
const TOOLTIP_EST_HEIGHT = 280;
const VIEWPORT_PADDING = 16;

type HoverState = { repo: Repo; style: CSSProperties } | null;

function computeTooltipStyle(rect: DOMRect): CSSProperties {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let left = rect.left - TOOLTIP_WIDTH - TOOLTIP_GAP;
  if (left < VIEWPORT_PADDING) {
    // Fallback: place to the right of the row.
    left = Math.min(rect.right + TOOLTIP_GAP, vw - TOOLTIP_WIDTH - VIEWPORT_PADDING);
  }

  let top = rect.top + rect.height / 2 - TOOLTIP_EST_HEIGHT / 2;
  if (top < VIEWPORT_PADDING) top = VIEWPORT_PADDING;
  const maxTop = vh - TOOLTIP_EST_HEIGHT - VIEWPORT_PADDING;
  if (top > maxTop) top = Math.max(VIEWPORT_PADDING, maxTop);

  return {
    position: "fixed",
    left: `${left}px`,
    top: `${top}px`,
    width: `${TOOLTIP_WIDTH}px`,
    zIndex: 50,
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

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
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

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (hover) setHover(null);
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
  }, [hover]);

  const handleHover = (repo: Repo, el: HTMLElement) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches
    ) {
      return;
    }
    setHover({ repo, style: computeTooltipStyle(el.getBoundingClientRect()) });
  };
  const handleLeave = () => setHover(null);

  const showSkeleton = items.length === 0 && loading;
  const showFooter = items.length > 0 && (loading || done);

  return (
    <>
      <ul
        ref={listRef}
        className="repo-scroll m-0 max-h-[60vh] min-h-0 flex-1 list-none p-0 lg:max-h-none"
      >
        {showSkeleton && <RepoSkeleton />}
        {!showSkeleton &&
          items.map((r) => (
            <RepoRow
              key={r.id}
              repo={r}
              onHover={(el) => handleHover(r, el)}
              onLeave={handleLeave}
            />
          ))}
        {showFooter && (
          <li className="flex list-none flex-col items-center gap-1.5 py-4">
            {loading ? (
              <>
                <span className="loading-bar" aria-hidden />
                <span className="font-mono text-[10px] tracking-[0.08em] text-oz-text-dim">
                  LOADING MORE
                </span>
              </>
            ) : (
              <span className="font-mono text-[11px] tracking-[0.04em] text-oz-text-dim">
                — end of history —
              </span>
            )}
          </li>
        )}
      </ul>
      {hover && <RepoTooltip repo={hover.repo} style={hover.style} />}
    </>
  );
}
