import { Download } from "lucide-react";

export function CvPill() {
  return (
    <a
      href="/ryan-eloy-cv.pdf"
      download="ryan-eloy-resume.pdf"
      className="cv-pill mt-8 flex min-h-[92px] w-full max-w-[540px] items-center gap-4 rounded-[14px] px-4 py-4 text-left text-oz-text no-underline sm:mt-10 sm:px-5"
    >
      <span className="cv-pill__icon grid size-12 shrink-0 place-items-center rounded-[10px]">
        <Download aria-hidden size={25} strokeWidth={2} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="display-type text-[17px] font-semibold leading-tight text-oz-text">
          Download resume
        </span>
        <span className="tui-mono text-[13px] leading-tight text-oz-text-mute">
          PDF
        </span>
      </span>
    </a>
  );
}
