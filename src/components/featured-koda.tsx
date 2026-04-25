import Image from "next/image";

export function FeaturedKoda() {
  return (
    <div className="flex shrink-0 flex-col gap-3 rounded-[22px] bg-oz-cyan-strip p-4 text-[#0a0a0a] sm:flex-row sm:items-center sm:gap-4 sm:p-5">
      <div className="flex shrink-0 flex-col gap-0.5 sm:min-w-[130px]">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-black/55">
          Featured
        </span>
        <span className="text-[16px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[18px]">
          Now <br className="hidden sm:inline" />building.
        </span>
      </div>

      <div className="hidden h-[42px] w-px bg-black/15 sm:block" />

      <a
        href="https://koda.ryaneloy.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-1 items-center gap-3 rounded-[12px] bg-white/40 px-3 py-2.5 text-[#0a0a0a] no-underline transition duration-150 hover:-translate-y-px hover:bg-white/70"
      >
        <span
          className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-[10px]"
          style={{ background: "#0a0a0a" }}
        >
          <Image
            src="/koda-mark.svg"
            alt=""
            width={32}
            height={32}
            className="block select-none"
          />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-px">
          <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-black/55">
            Open Source · Apache-2.0
          </span>
          <span className="truncate text-[15px] font-semibold tracking-[-0.015em]">
            Koda
          </span>
          <span className="truncate font-mono text-[10.5px] text-black/60">
            AI agent orchestration · koda.ryaneloy.dev
          </span>
        </div>
        <svg
          aria-hidden
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-black/60 transition-transform group-hover:translate-x-0.5"
        >
          <path d="M7 17L17 7M17 7H8M17 7V16" />
        </svg>
      </a>
    </div>
  );
}
