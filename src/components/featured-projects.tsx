"use client";

import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import {
  FEATURED_FALLBACK_REPOS,
  FEATURED_REPOS,
  fetchFeaturedRepos,
  languageColor,
  type Repo,
} from "@/lib/github";

type ProjectBrand = {
  displayName?: string;
  logoSrc: string;
  logoAlt: string;
  accent: string;
  iconBg: string;
  objectFit?: "contain" | "cover";
  fallbackDescription: string;
};

const PROJECT_BRANDS: Record<string, ProjectBrand> = {
  koda: {
    logoSrc: "/koda-mark.svg",
    logoAlt: "Koda logo",
    accent: "#161616",
    iconBg: "#161616",
    fallbackDescription: "AI agent orchestration.",
  },
  noble: {
    logoSrc: "/noble-icon.png",
    logoAlt: "Noble app icon",
    accent: "#4ade80",
    iconBg: "#0d0b0a",
    objectFit: "cover",
    fallbackDescription:
      "Offline SwiftUI app for scanning sport cards, turning them in 3D, and posting them.",
  },
  sidedoor: {
    displayName: "Sidedoor",
    logoSrc: "/sidedoor-mark.svg",
    logoAlt: "Sidedoor logo",
    accent: "#3fb950",
    iconBg: "#100e0b",
    objectFit: "cover",
    fallbackDescription:
      "Local-first webhook inspector, API mock server, and realtime protocol test harness.",
  },
};

const DEFAULT_BRAND: ProjectBrand = {
  logoSrc: "/favicon.svg",
  logoAlt: "Project logo",
  accent: "#549F86",
  iconBg: "#161616",
  fallbackDescription: "Featured repository.",
};

function brandFor(repo: Repo): ProjectBrand {
  return PROJECT_BRANDS[repo.name.toLowerCase()] ?? DEFAULT_BRAND;
}

function hrefFor(repo: Repo): string {
  return repo.homepage ?? repo.url;
}

function hostnameFor(url: string | null): string | null {
  if (!url) return null;

  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function FeaturedProjectRow({ repo, index }: { repo: Repo; index: number }) {
  const brand = brandFor(repo);
  const langColor = languageColor(repo.language);
  const meta = [repo.language, hostnameFor(repo.homepage)]
    .filter(Boolean)
    .join(" · ");
  const style = {
    "--project-accent": brand.accent,
    "--project-icon-bg": brand.iconBg,
  } as CSSProperties;

  return (
    <a
      href={hrefFor(repo)}
      target="_blank"
      rel="noopener noreferrer"
      className="featured-project-row group px-5 py-3.5 text-oz-text no-underline sm:px-7"
      style={style}
    >
      <span
        className="featured-project-logo"
        aria-hidden="true"
      >
        <Image
          src={brand.logoSrc}
          alt=""
          width={56}
          height={56}
          sizes="56px"
          priority={index === 0}
          className="size-full select-none"
          style={{ objectFit: brand.objectFit ?? "contain" }}
        />
      </span>

      <span className="flex min-w-0 flex-col gap-1.5">
        <span className="flex min-w-0 items-center gap-2">
          <span className="display-type truncate text-[17px] font-bold leading-snug text-oz-text">
            {brand.displayName ?? repo.name}
          </span>
          <span
            className="inline-block size-1.5 shrink-0 rounded-full"
            style={{ background: langColor }}
            aria-hidden="true"
          />
        </span>
        <span className="tui-mono truncate text-[10.5px] uppercase text-oz-text-mute">
          {meta || "Open source"}
        </span>
        <span className="line-clamp-2 text-[13px] leading-snug text-oz-text-mute">
          {repo.description || brand.fallbackDescription}
        </span>
      </span>

      <span className="flex items-center gap-3 justify-self-end">
        {repo.stars > 0 && (
          <span className="hidden items-center gap-1 tui-mono text-[12px] text-oz-text-mute sm:inline-flex">
            <Star aria-hidden size={13} strokeWidth={2} />
            {repo.stars}
          </span>
        )}
        <ArrowUpRight
          aria-hidden
          size={19}
          strokeWidth={1.9}
          className="text-oz-text transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </a>
  );
}

export function FeaturedProjects() {
  const [repos, setRepos] = useState<Repo[]>(FEATURED_FALLBACK_REPOS);

  useEffect(() => {
    const controller = new AbortController();

    fetchFeaturedRepos(controller.signal)
      .then((items) => setRepos(items))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.warn("[featured-projects] failed to load:", err);
      });

    return () => controller.abort();
  }, []);

  const visibleRepos = repos.slice(0, FEATURED_REPOS.length);

  return (
    <section
      id="projects"
      className="glass-panel flex scroll-mt-28 flex-col overflow-hidden rounded-[16px]"
      aria-labelledby="featured-title"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-oz-border px-5 py-4 sm:px-7">
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="tui-mono text-[11px] uppercase text-oz-text-mute">
            Featured
          </span>
          <h2
            id="featured-title"
            className="display-type text-[24px] font-bold leading-none text-oz-text sm:text-[26px]"
          >
            Featured projects
          </h2>
        </div>
        <span className="tui-mono hidden text-[12px] uppercase text-oz-text-mute sm:inline">
          {visibleRepos.length}/{FEATURED_REPOS.length}
        </span>
      </div>

      <div className="divide-y divide-oz-border">
        {visibleRepos.map((repo, index) => (
          <FeaturedProjectRow key={repo.id} repo={repo} index={index} />
        ))}
      </div>
    </section>
  );
}
