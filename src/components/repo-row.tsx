import { formatRelativeDate, languageColor, type Repo } from "@/lib/github";

type Props = {
  repo: Repo;
  onHover?: (el: HTMLElement) => void;
  onLeave?: () => void;
};

export function RepoRow({ repo, onHover, onLeave }: Props) {
  const lang = repo.language ?? "—";
  const color = languageColor(repo.language);
  const isExternal = repo.url.startsWith("http");

  return (
    <li className="list-none">
      <a
        href={repo.url}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="repo-row px-4 py-3 sm:px-5"
        onMouseEnter={(e) => onHover?.(e.currentTarget)}
        onMouseLeave={() => onLeave?.()}
        onFocus={(e) => onHover?.(e.currentTarget)}
        onBlur={() => onLeave?.()}
      >
        <span className="repo-row__rail" style={{ background: color }} />

        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="flex min-w-0 items-baseline gap-2.5">
            <span className="truncate text-[14px] font-semibold tracking-[-0.015em] text-oz-text">
              {repo.name}
            </span>
            {repo.archived && (
              <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-oz-text-dim">
                archived
              </span>
            )}
          </div>
          {repo.description && (
            <div className="truncate text-[12px] leading-snug text-oz-text-mute">
              {repo.description}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-3 font-mono text-[11px] text-oz-text-dim sm:gap-4">
          <span className="inline-flex items-center gap-1.5" aria-label={lang}>
            <span
              className="inline-block size-1.5 shrink-0 rounded-full"
              style={{ background: color }}
            />
            <span className="hidden sm:inline">{lang}</span>
          </span>
          {repo.stars > 0 && (
            <span className="inline-flex items-center gap-1">
              <svg
                width="11"
                height="11"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden
              >
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
              </svg>
              {repo.stars}
            </span>
          )}
          <span className="hidden min-w-[44px] text-right sm:inline">
            {formatRelativeDate(repo.updated_at)}
          </span>
          <svg
            className="repo-row__arrow"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M7 17L17 7M17 7H8M17 7V16" />
          </svg>
        </div>
      </a>
    </li>
  );
}
