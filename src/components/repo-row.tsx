import { ArrowUpRight, Star } from "lucide-react";
import { formatRelativeDate, languageColor, type Repo } from "@/lib/github";
import type { CSSProperties } from "react";

type Props = {
  repo: Repo;
  onHover?: (el: HTMLElement) => void;
  onLeave?: () => void;
};

export function RepoRow({ repo, onHover, onLeave }: Props) {
  const lang = repo.language ?? "—";
  const color = languageColor(repo.language);
  const isExternal = repo.url.startsWith("http");
  const style = { "--repo-color": color } as CSSProperties;

  return (
    <li className="list-none border-t border-oz-border first:border-t-0">
      <a
        href={repo.url}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="repo-row px-5 py-4 sm:px-7"
        style={style}
        onMouseEnter={(e) => onHover?.(e.currentTarget)}
        onMouseLeave={() => onLeave?.()}
        onFocus={(e) => onHover?.(e.currentTarget)}
        onBlur={() => onLeave?.()}
      >
        <span className="flex min-w-0 flex-col gap-1">
          <span className="flex min-w-0 items-baseline gap-2.5">
            <span className="display-type truncate text-[17px] font-bold leading-snug text-oz-text">
              {repo.name}
            </span>
            {repo.archived && (
              <span className="tui-mono text-[10px] uppercase text-oz-text-dim">
                archived
              </span>
            )}
          </span>
          {repo.description && (
            <span className="line-clamp-2 text-[14px] leading-snug text-oz-text-mute sm:truncate">
              {repo.description}
            </span>
          )}
        </span>

        <span className="flex min-w-0 shrink-0 items-center gap-4 tui-mono text-[12px] text-oz-text-mute">
          <span className="inline-flex min-w-0 items-center gap-2" aria-label={lang}>
            <span
              className="inline-block size-1.5 shrink-0 rounded-full"
              style={{ background: color }}
            />
            <span className="hidden max-w-[96px] truncate sm:inline">{lang}</span>
          </span>
          {repo.stars > 0 && (
            <span className="inline-flex items-center gap-1">
              <Star aria-hidden size={13} strokeWidth={2} />
              {repo.stars}
            </span>
          )}
          <span className="hidden min-w-[64px] text-right sm:inline">
            {formatRelativeDate(repo.updated_at)}
          </span>
          <ArrowUpRight
            aria-hidden
            size={16}
            strokeWidth={2}
            className="repo-row__arrow"
          />
        </span>
      </a>
    </li>
  );
}
