import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-oz-bg px-6">
      <div className="text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-oz-text-dim">
          404
        </div>
        <h1 className="mt-4 text-[44px] font-extrabold leading-[0.95] tracking-[-0.045em] text-oz-text md:text-[64px]">
          Page not found
          <span className="text-oz-green">.</span>
        </h1>
        <p className="mx-auto mt-3 max-w-[36ch] text-[14.5px] text-oz-text-mute">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-1.5 font-mono text-[13px] text-oz-text-mute no-underline transition-colors hover:text-oz-green"
        >
          <span aria-hidden>←</span>
          back home
        </Link>
      </div>
    </main>
  );
}
