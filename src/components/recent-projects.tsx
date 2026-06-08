import { ArrowUpRight } from "lucide-react";
import { RepoList } from "@/components/repo-list";

export function RecentProjects() {
  return (
    <section
      id="repositories"
      className="glass-panel flex min-h-[520px] scroll-mt-28 flex-col overflow-hidden rounded-[16px] lg:min-h-0 lg:flex-1"
      aria-labelledby="repositories-title"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-oz-border px-5 py-5 sm:px-7">
        <h2
          id="repositories-title"
          className="text-[24px] font-bold leading-none text-oz-text sm:text-[26px]"
        >
          Recent projects
        </h2>
        <a
          href="https://github.com/ryan-mf-eloy"
          target="_blank"
          rel="noopener noreferrer"
          className="group hidden items-center gap-1.5 text-[13px] text-oz-text-mute no-underline transition-colors hover:text-oz-text sm:inline-flex"
        >
          <span className="tui-mono">github.com/ryan-mf-eloy</span>
          <ArrowUpRight
            aria-hidden
            size={14}
            strokeWidth={2}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
      <RepoList />
    </section>
  );
}
