import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { InfinityBackground } from "@/components/infinity-background";

export default function NotFound() {
  return (
    <main className="constellation-bg grid min-h-screen place-items-center px-6">
      <InfinityBackground />
      <div className="text-center">
        <div className="tui-mono text-[11px] uppercase text-oz-text-dim">
          404
        </div>
        <h1 className="mt-4 text-[44px] font-extrabold leading-[0.95] text-oz-text md:text-[64px]">
          Page not found
          <span className="text-oz-green">.</span>
        </h1>
        <p className="mx-auto mt-3 max-w-[36ch] text-[14.5px] text-oz-text-mute">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="tui-mono mt-10 inline-flex items-center gap-1.5 text-[13px] text-oz-text-mute no-underline transition-colors hover:text-oz-green"
        >
          <ArrowLeft aria-hidden size={14} strokeWidth={2} />
          back home
        </Link>
      </div>
    </main>
  );
}
