import { FeaturedKoda } from "@/components/featured-koda";
import { PortfolioHeader } from "@/components/portfolio-header";
import { RecentProjects } from "@/components/recent-projects";
import { TuiCard } from "@/components/tui-card";

export default function Home() {
  return (
    <main className="min-h-screen bg-oz-bg lg:h-[100dvh] lg:min-h-[680px] lg:overflow-hidden">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col p-3 sm:p-5 lg:p-6">
        <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(360px,40%)_1fr]">
          <TuiCard />
          <section className="flex min-h-0 min-w-0 flex-col gap-4">
            <PortfolioHeader />
            <FeaturedKoda />
            <RecentProjects />
          </section>
        </div>
      </div>
    </main>
  );
}
