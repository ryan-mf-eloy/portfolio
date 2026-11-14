"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import resume from "@/data/resume-fallback.json";
import {
  panelId,
  SegmentedTabs,
  tabId,
  type SegmentedTab,
} from "@/components/segmented-tabs";

type WorkEntry = {
  name: string;
  position: string;
  url: string;
  logo?: string;
  headline: string;
  description: string;
  summary?: string;
  location: string;
  startDate: string;
  endDate?: string;
  impact: string[];
};

type SkillGroup = {
  name: string;
  keywords: string[];
};

type CompanyMark =
  | { kind: "logo"; src: string }
  | { kind: "monogram"; initials: string };

type ExperienceTab = "roles" | "stack";

const ID_PREFIX = "experience";
const TABS: readonly SegmentedTab<ExperienceTab>[] = [
  { id: "roles", label: "Roles" },
  { id: "stack", label: "Stack" },
];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MAX_IMPACT_LINES = 2;

const work: WorkEntry[] = resume.work;
const skills: SkillGroup[] = resume.skills;

function formatMonth(value: string): string {
  const [year, month] = value.split("-");
  const label = MONTHS[Number(month) - 1];
  return label ? `${label} ${year}` : year;
}

function formatPeriod(job: WorkEntry): string {
  const end = job.endDate ? formatMonth(job.endDate) : "Present";
  return `${formatMonth(job.startDate)} – ${end}`;
}

function formatYears(job: WorkEntry): string {
  const end = job.endDate ? job.endDate.slice(0, 4) : "Now";
  return `${job.startDate.slice(0, 4)} — ${end}`;
}

function hostnameFor(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .filter((word) => /^\p{L}/u.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function markFor(job: WorkEntry): CompanyMark {
  return job.logo
    ? { kind: "logo", src: job.logo }
    : { kind: "monogram", initials: initialsFor(job.name) };
}

function shortKeyword(keyword: string): string {
  return keyword.split(" (")[0];
}

function CompanyLogo({ mark }: { mark: CompanyMark }) {
  switch (mark.kind) {
    case "logo":
      return (
        <span className="experience-logo" aria-hidden="true">
          <Image
            src={mark.src}
            alt=""
            width={56}
            height={56}
            sizes="56px"
            className="size-full select-none object-cover"
          />
        </span>
      );
    case "monogram":
      return (
        <span className="experience-logo experience-logo--monogram" aria-hidden="true">
          <span className="display-type text-[18px] font-bold leading-none">
            {mark.initials}
          </span>
        </span>
      );
    default: {
      const unreachable: never = mark;
      return unreachable;
    }
  }
}

function RoleRow({
  job,
  index,
  open,
  onToggle,
}: {
  job: WorkEntry;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const buttonId = `experience-role-${index}`;
  const detailsId = `experience-role-${index}-details`;
  const context = [formatPeriod(job), job.summary, job.location].filter(Boolean).join(" · ");

  return (
    <li className="reveal-item" style={{ "--i": index } as CSSProperties}>
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={detailsId}
        data-open={open}
        className="experience-role group px-5 py-3 text-oz-text sm:px-7"
        onClick={onToggle}
      >
        <CompanyLogo mark={markFor(job)} />

        <span className="flex min-w-0 flex-col gap-1">
          <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <span className="display-type min-w-0 text-[17px] font-bold leading-snug text-oz-text sm:truncate">
              {job.name}
            </span>
            {!job.endDate && <span className="live-dot shrink-0" aria-label="Current role" />}
            <span className="experience-metric tui-mono">{job.headline}</span>
          </span>
          <span className="tui-mono flex min-w-0 flex-wrap gap-x-1.5 text-[10.5px] uppercase text-oz-text-mute sm:flex-nowrap">
            <span className="shrink-0 whitespace-nowrap tabular-nums">
              {formatYears(job)}
              <span aria-hidden="true"> ·</span>
            </span>
            <span className="min-w-0 sm:truncate">{job.position}</span>
          </span>
          <span className="text-[13px] leading-snug text-oz-text-mute">
            {job.description}
          </span>
        </span>

        <ChevronDown
          aria-hidden
          size={19}
          strokeWidth={1.9}
          className="experience-role__chevron justify-self-end"
        />
      </button>

      <div
        id={detailsId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        inert={!open}
        data-open={open}
        className="experience-details"
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-2 pb-4 pl-[90px] pr-5 sm:pl-[98px] sm:pr-7">
            <span className="tui-mono text-[10.5px] uppercase leading-relaxed text-oz-text-mute">
              {context}
            </span>
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {job.impact.slice(0, MAX_IMPACT_LINES).map((line) => (
                <li key={line} className="experience-impact text-[13px] leading-snug text-oz-text-soft">
                  {line}
                </li>
              ))}
            </ul>
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link tui-mono inline-flex w-fit items-center gap-1 text-[11px] text-oz-text-mute no-underline transition-colors hover:text-oz-text"
            >
              {hostnameFor(job.url)}
              <ArrowUpRight
                aria-hidden
                size={12}
                strokeWidth={2}
                className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}

function RolesPanel() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ol className="m-0 list-none divide-y divide-oz-border p-0">
      {work.map((job, index) => (
        <RoleRow
          key={job.name}
          job={job}
          index={index}
          open={openIndex === index}
          onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
        />
      ))}
    </ol>
  );
}

function StackPanel() {
  return (
    <dl className="m-0 flex flex-col gap-3 px-5 py-4 sm:px-7">
      {skills.map((group, index) => (
        <div
          key={group.name}
          className="reveal-item grid gap-1.5 sm:grid-cols-[124px_minmax(0,1fr)] sm:items-baseline sm:gap-4"
          style={{ "--i": index } as CSSProperties}
        >
          <dt className="tui-mono text-[10.5px] uppercase text-oz-text-dim">{group.name}</dt>
          <dd className="m-0 flex flex-wrap gap-1.5">
            {group.keywords.map((keyword) => (
              <span key={keyword} className="stack-pill tui-mono" title={keyword}>
                {shortKeyword(keyword)}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ActivePanel({ tab }: { tab: ExperienceTab }) {
  switch (tab) {
    case "roles":
      return <RolesPanel />;
    case "stack":
      return <StackPanel />;
    default: {
      const unreachable: never = tab;
      return unreachable;
    }
  }
}

export function Experience() {
  const [tab, setTab] = useState<ExperienceTab>("roles");
  const firstYear = work.at(-1)?.startDate.slice(0, 4);

  return (
    <section
      id="experience"
      className="glass-panel flex scroll-mt-28 flex-col overflow-hidden rounded-[16px]"
      aria-labelledby="experience-title"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-oz-border px-5 py-3.5 sm:px-7">
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="tui-mono text-[11px] uppercase text-oz-text-mute">
            Career{firstYear && ` · since ${firstYear}`}
          </span>
          <h2
            id="experience-title"
            className="display-type text-[24px] font-bold leading-none text-oz-text sm:text-[26px]"
          >
            Experience
          </h2>
        </div>
        <SegmentedTabs
          idPrefix={ID_PREFIX}
          label="Experience views"
          tabs={TABS}
          value={tab}
          onChange={setTab}
        />
      </div>

      <div
        key={tab}
        role="tabpanel"
        id={panelId(ID_PREFIX, tab)}
        aria-labelledby={tabId(ID_PREFIX, tab)}
        className="tab-panel"
        data-active="true"
      >
        <ActivePanel tab={tab} />
      </div>
    </section>
  );
}
