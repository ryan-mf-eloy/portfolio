import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import resume from "@/data/resume-fallback.json";

type WorkEntry = {
  name: string;
  position: string;
  url: string;
  logo?: string;
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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MAX_IMPACT_LINES = 2;
const MAX_KEYWORDS_PER_GROUP = 4;

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
            width={44}
            height={44}
            sizes="44px"
            className="size-full select-none object-cover"
          />
        </span>
      );
    case "monogram":
      return (
        <span className="experience-logo experience-logo--monogram" aria-hidden="true">
          <span className="display-type text-[15px] font-bold leading-none">
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

function ExperienceRow({ job }: { job: WorkEntry }) {
  const context = job.summary ?? job.location;

  return (
    <li className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 px-5 py-4 sm:px-7">
      <CompanyLogo mark={markFor(job)} />
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-w-0 items-center gap-1 text-oz-text no-underline"
          >
            <span className="display-type text-[16px] font-bold leading-snug">
              {job.name}
            </span>
            <ArrowUpRight
              aria-hidden
              size={14}
              strokeWidth={2}
              className="shrink-0 text-oz-text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-oz-text"
            />
          </a>
          <span className="tui-mono shrink-0 text-[11px] uppercase tabular-nums text-oz-text-mute">
            {formatPeriod(job)}
          </span>
        </div>
        <p className="m-0 text-[13.5px] leading-snug text-oz-text-soft">
          {job.position}
          <span className="text-oz-text-mute"> · {context}</span>
        </p>
        <ul className="m-0 mt-1 flex list-none flex-col gap-1 p-0">
          {job.impact.slice(0, MAX_IMPACT_LINES).map((line) => (
            <li key={line} className="experience-impact text-[13px] leading-snug text-oz-text-mute">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function KeyTechnologies() {
  return (
    <div className="border-t border-oz-border px-5 py-4 sm:px-7">
      <span className="tui-mono text-[11px] uppercase text-oz-text-mute">
        Key technologies
      </span>
      <dl className="m-0 mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.name} className="grid grid-cols-[104px_minmax(0,1fr)] items-baseline gap-3">
            <dt className="tui-mono text-[10.5px] uppercase text-oz-text-dim">
              {group.name}
            </dt>
            <dd className="tui-mono m-0 flex flex-wrap gap-x-2 text-[12px] leading-relaxed text-oz-text-soft">
              {group.keywords.slice(0, MAX_KEYWORDS_PER_GROUP).map((keyword, index, list) => (
                <span key={keyword} className="whitespace-nowrap">
                  {shortKeyword(keyword)}
                  {index < list.length - 1 && (
                    <span className="ml-2 text-oz-text-dim" aria-hidden="true">·</span>
                  )}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Experience() {
  const firstYear = work.at(-1)?.startDate.slice(0, 4);

  return (
    <section
      id="experience"
      className="glass-panel flex scroll-mt-28 flex-col overflow-hidden rounded-[16px]"
      aria-labelledby="experience-title"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-oz-border px-5 py-4 sm:px-7">
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="tui-mono text-[11px] uppercase text-oz-text-mute">
            Career
          </span>
          <h2
            id="experience-title"
            className="display-type text-[24px] font-bold leading-none text-oz-text sm:text-[26px]"
          >
            Experience
          </h2>
        </div>
        {firstYear && (
          <span className="tui-mono hidden text-[12px] uppercase text-oz-text-mute sm:inline">
            Since {firstYear}
          </span>
        )}
      </div>

      <ol className="m-0 list-none divide-y divide-oz-border p-0">
        {work.map((job) => (
          <ExperienceRow key={job.name} job={job} />
        ))}
      </ol>

      <KeyTechnologies />
    </section>
  );
}
