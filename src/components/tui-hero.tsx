import Image from "next/image";

export function TuiHero() {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
      <Image
        src="/ryan-eloy-photo.png"
        alt="Ryan Eloy"
        width={176}
        height={176}
        priority
        sizes="(min-width: 1024px) 128px, (min-width: 640px) 104px, 88px"
        className="size-[88px] shrink-0 rounded-full border border-oz-border object-cover sm:size-[104px] lg:size-32"
      />
      <div className="flex min-w-0 flex-col sm:pt-3 lg:pt-4">
        <div className="tui-mono mb-4 flex items-center gap-2 text-[12px] uppercase leading-none text-oz-text-mute">
          <span className="intro-dot" aria-hidden />
          <span>Hello, I&apos;m</span>
        </div>
        <h1
          id="profile-heading"
          className="flex items-baseline whitespace-nowrap text-[54px] font-extrabold leading-[0.92] text-oz-text sm:text-[72px] lg:text-[78px] xl:text-[84px]"
        >
          Ryan Eloy
          <span className="tui-cursor" aria-hidden />
        </h1>
        <div className="tui-mono mt-5 flex flex-wrap items-center gap-3 text-[13px] uppercase leading-normal text-oz-text-mute sm:text-[14px]">
          <span>Senior Full Stack Developer</span>
          <span className="intro-dot" aria-hidden />
          <span>7 years</span>
        </div>
      </div>
    </div>
  );
}
