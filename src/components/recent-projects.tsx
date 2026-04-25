import { RepoList } from "@/components/repo-list";

export function RecentProjects() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[22px] border border-oz-border bg-oz-surface">
      <div className="flex shrink-0 items-baseline justify-between border-b border-oz-border px-5 py-3.5">
        <div className="flex items-baseline gap-3">
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-oz-text">
            Recent projects
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="live-dot" aria-hidden />
            <span className="font-mono text-[10px] tracking-[0.1em] text-oz-text-dim">
              LIVE
            </span>
          </span>
        </div>
        <a
          href="https://github.com/ryan-mf-eloy"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 font-mono text-[11px] text-oz-text-dim no-underline transition-colors hover:text-oz-text"
        >
          github.com/ryan-mf-eloy
          <svg
            aria-hidden
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-0.5"
          >
            <path d="M7 17L17 7M17 7H8M17 7V16" />
          </svg>
        </a>
      </div>
      <RepoList />
    </div>
  );
}
