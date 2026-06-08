import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function FloatingActions() {
  return (
    <div
      className="floating-actions pointer-events-none fixed right-5 top-5 z-40 flex w-max items-center justify-end gap-2 sm:right-8 sm:top-6 sm:gap-3"
      role="group"
      aria-label="Page actions"
    >
      <ThemeToggle />
      <a
        href="https://wa.me/5511973041534"
        target="_blank"
        rel="noopener noreferrer"
        className="group pointer-events-auto inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--oz-button-bg)] px-5 text-[14px] font-semibold text-[var(--oz-button-text)] no-underline transition-opacity hover:opacity-90 sm:h-12 sm:px-7"
      >
        Contact me
        <ArrowRight
          aria-hidden
          size={17}
          strokeWidth={2}
          className="transition-transform group-hover:translate-x-1"
        />
      </a>
    </div>
  );
}
