"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { FeaturedProjectList } from "@/components/featured-projects";
import { RepoList } from "@/components/repo-list";
import {
  panelId,
  SegmentedTabs,
  tabId,
  type SegmentedTab,
} from "@/components/segmented-tabs";
import { FEATURED_REPOS } from "@/lib/github";

type ProjectsTab = "featured" | "recent";

const ID_PREFIX = "projects";
const TABS: readonly SegmentedTab<ProjectsTab>[] = [
  { id: "featured", label: "Featured" },
  { id: "recent", label: "Recent" },
];

function PanelContext({ tab }: { tab: ProjectsTab }) {
  switch (tab) {
    case "featured":
      return (
        <span className="tui-mono text-[11px] uppercase text-oz-text-mute">
          {FEATURED_REPOS.length} picks
        </span>
      );
    case "recent":
      return (
        <a
          href="https://github.com/ryan-mf-eloy"
          target="_blank"
          rel="noopener noreferrer"
          className="group tui-mono inline-flex items-center gap-1 text-[11px] uppercase text-oz-text-mute no-underline transition-colors hover:text-oz-text"
        >
          github.com/ryan-mf-eloy
          <ArrowUpRight
            aria-hidden
            size={12}
            strokeWidth={2}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      );
    default: {
      const unreachable: never = tab;
      return unreachable;
    }
  }
}

export function ProjectsPanel() {
  const [tab, setTab] = useState<ProjectsTab>("featured");
  const showRecent = tab === "recent";

  return (
    <section
      id="projects"
      className="glass-panel flex scroll-mt-28 flex-col overflow-hidden rounded-[16px]"
      aria-labelledby="projects-title"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-oz-border px-5 py-3.5 sm:px-7">
        <div className="flex min-w-0 flex-col gap-1.5">
          <PanelContext key={tab} tab={tab} />
          <h2
            id="projects-title"
            className="display-type text-[24px] font-bold leading-none text-oz-text sm:text-[26px]"
          >
            Projects
          </h2>
        </div>
        <SegmentedTabs
          idPrefix={ID_PREFIX}
          label="Project lists"
          tabs={TABS}
          value={tab}
          onChange={setTab}
        />
      </div>

      <div className="relative">
        <div
          role="tabpanel"
          id={panelId(ID_PREFIX, "featured")}
          aria-labelledby={tabId(ID_PREFIX, "featured")}
          aria-hidden={showRecent}
          inert={showRecent}
          className="tab-panel"
          data-active={!showRecent}
        >
          <FeaturedProjectList />
        </div>
        <div
          role="tabpanel"
          id={panelId(ID_PREFIX, "recent")}
          aria-labelledby={tabId(ID_PREFIX, "recent")}
          aria-hidden={!showRecent}
          inert={!showRecent}
          className="tab-panel absolute inset-0 flex flex-col"
          data-active={showRecent}
        >
          <RepoList />
        </div>
      </div>
    </section>
  );
}
