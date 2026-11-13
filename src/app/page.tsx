import { Experience } from "@/components/experience";
import { FloatingActions } from "@/components/floating-actions";
import { InfinityBackground } from "@/components/infinity-background";
import { ProjectsPanel } from "@/components/projects-panel";
import { TuiCard } from "@/components/tui-card";

export default function Home() {
  return (
    <main className="constellation-bg min-h-screen text-oz-text">
      <InfinityBackground />
      <FloatingActions />
      <div className="mx-auto flex w-full max-w-[1600px] flex-col px-5 pb-12 pt-[112px] sm:px-8 sm:pb-14 sm:pt-[124px] lg:min-h-screen lg:px-8 lg:pb-6 lg:pt-24 xl:px-10">
        <div className="grid min-h-0 flex-1 gap-10 lg:grid-cols-[minmax(420px,38%)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
          <TuiCard />
          <section className="flex min-h-0 min-w-0 flex-col gap-4">
            <ProjectsPanel />
            <Experience />
          </section>
        </div>
      </div>
    </main>
  );
}
