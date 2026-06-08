import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function FeaturedKoda() {
  return (
    <section id="projects" className="scroll-mt-28" aria-labelledby="featured-title">
      <a
        href="https://koda.ryaneloy.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="glass-panel group grid min-h-[146px] grid-cols-1 gap-5 rounded-[16px] p-5 text-oz-text no-underline transition-colors hover:border-oz-border-strong sm:grid-cols-[150px_1px_minmax(0,1fr)] sm:items-center sm:gap-7 sm:p-7"
      >
        <div className="flex flex-col gap-3">
          <span className="tui-mono text-[11px] uppercase text-oz-text-mute">
            Featured
          </span>
          <span
            id="featured-title"
            className="display-type text-[24px] font-bold leading-[1.18] text-oz-text sm:text-[25px]"
          >
            Now
            <br />
            building.
          </span>
        </div>

        <div className="hidden h-[86px] w-px bg-oz-border-strong sm:block" />

        <div className="grid min-w-0 grid-cols-[64px_minmax(0,1fr)_24px] items-center gap-4 sm:gap-5">
          <span className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-[14px] bg-[var(--oz-palette-ink)] ring-1 ring-oz-border-strong">
            <Image
              src="/koda-mark.svg"
              alt=""
              width={42}
              height={42}
              className="block select-none"
            />
          </span>

          <span className="flex min-w-0 flex-col gap-2">
            <span className="display-type text-[22px] font-bold leading-none text-oz-text">
              Koda
            </span>
            <span className="tui-mono text-[12px] uppercase text-oz-text-mute">
              Open Source · Apache-2.0
            </span>
            <span className="tui-mono truncate text-[13px] text-oz-text-mute">
              AI agent orchestration · koda.ryaneloy.dev
            </span>
          </span>

          <ArrowUpRight
            aria-hidden
            size={24}
            strokeWidth={1.8}
            className="justify-self-end text-oz-text transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
      </a>
    </section>
  );
}
