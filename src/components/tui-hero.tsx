import Image from "next/image";

export function TuiHero() {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Image
        src="/ryan-eloy-photo.png"
        alt="Ryan Eloy"
        width={176}
        height={176}
        priority
        sizes="(min-width: 1024px) 88px, (min-width: 640px) 80px, 56px"
        className="size-14 shrink-0 rounded-full object-cover ring-1 ring-oz-border sm:size-20 lg:size-[88px]"
      />
      <div className="flex min-w-0 flex-col gap-1.5">
        <div className="tui-mono text-[10.5px] uppercase tracking-[0.06em] text-oz-text-mute sm:text-[11px]">
          <span className="text-oz-green">▸</span> hello, I&apos;m
        </div>
        <div className="flex items-baseline text-[34px] leading-none font-extrabold tracking-[-0.045em] text-oz-text sm:text-[44px] lg:text-[52px]">
          Ryan Eloy
          <span className="tui-cursor" aria-hidden />
        </div>
        <div className="tui-mono text-[10.5px] tracking-[0.04em] text-oz-text-dim sm:text-[11px]">
          Full Stack JS Developer · 7 years
        </div>
      </div>
    </div>
  );
}
