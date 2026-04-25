export function PortfolioHeader() {
  return (
    <div className="flex shrink-0 flex-wrap items-start justify-between gap-x-4 gap-y-2">
      <h2 className="text-[40px] font-extrabold leading-[0.85] tracking-[-0.05em] text-oz-text sm:text-[64px] md:text-[88px] lg:text-[100px] xl:text-[110px]">
        Portfolio<span className="text-oz-green">/</span>
      </h2>
      <a
        href="https://wa.me/5511973041534"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex shrink-0 items-center gap-2 self-end rounded-full bg-oz-green px-4 py-2.5 text-[13px] font-semibold text-[#042814] no-underline transition-colors hover:bg-[#00d558]"
      >
        Contact
        <svg
          aria-hidden
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:translate-x-0.5"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </div>
  );
}
