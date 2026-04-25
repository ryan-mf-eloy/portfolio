import { CvPill } from "@/components/cv-pill";
import { TrafficLights } from "@/components/traffic-lights";
import { TuiBio } from "@/components/tui-bio";
import { TuiContacts } from "@/components/tui-contacts";
import { TuiHero } from "@/components/tui-hero";

export function TuiCard() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[22px] border border-oz-border bg-[#0a0a0a]">
      <div className="tui-scanlines" />

      <div className="relative z-[2] flex shrink-0 items-center gap-2 border-b border-white/5 bg-white/[0.015] px-3.5 py-2.5">
        <TrafficLights />
        <span className="tui-mono ml-2 mr-12 flex-1 text-center text-[11px] tracking-[0.02em] text-oz-text-mute">
          about — ryan eloy
        </span>
      </div>

      <div className="relative z-[2] flex min-h-0 flex-1 flex-col overflow-hidden p-5 lg:p-[22px] lg:pb-[18px]">
        <TuiHero />
        <div className="mt-[18px]">
          <TuiBio />
        </div>
        <CvPill />
        <div className="min-h-3 flex-1" />
        <TuiContacts />
      </div>
    </div>
  );
}
