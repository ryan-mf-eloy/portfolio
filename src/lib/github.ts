export const PER_PAGE = 8;
export const MAX_REPO_PAGE = 20;
export const FEATURED_LIMIT = 3;
export const FEATURED_TOPIC = "portfolio-featured";
const FEATURED_ORDER_PREFIX = "portfolio-featured-";
const GH_USER = "ryan-mf-eloy";

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
  homepage: string | null;
  updated_at: string;
  archived: boolean;
  topics: string[];
};

export const OPEN_GRAPH_IMAGE_URL = (name: string) =>
  `https://opengraph.githubassets.com/ryan-eloy-portfolio/${GH_USER}/${encodeURIComponent(name)}`;

export const PREVIEW_IMAGE_URL = (name: string) =>
  `/api/preview/${encodeURIComponent(name)}`;

export const LANG_COLORS: Record<string, string> = {
  TypeScript: "#58A1E1",
  JavaScript: "#E3EB84",
  Rust: "#FE7B42",
  Go: "#58A1E1",
  Python: "#549F86",
  CSS: "#677669",
  HTML: "#FE7B42",
  Shell: "#677669",
  Java: "#FE7B42",
  Ruby: "#FE7B42",
  Swift: "#FE7B42",
  Kotlin: "#58A1E1",
  C: "#677669",
  "C++": "#677669",
  Vue: "#549F86",
  Svelte: "#FE7B42",
};

export function languageColor(lang: string | null | undefined): string {
  if (!lang) return "#677669";
  return LANG_COLORS[lang] ?? "#677669";
}

export const DEMO_REPOS: Repo[] = [
  { id: 1, name: "react-typed-routes", description: "Type-safe route helpers for Next.js & React Router", language: "TypeScript", stars: 142, url: "#", homepage: null, updated_at: "2026-04-12T00:00:00Z", archived: false, topics: [] },
  { id: 2, name: "ts-result", description: "Lightweight Result/Either type with zero deps", language: "TypeScript", stars: 89, url: "#", homepage: null, updated_at: "2026-04-08T00:00:00Z", archived: false, topics: [] },
  { id: 3, name: "edge-cache-kit", description: "Cache primitives for Vercel + Cloudflare workers", language: "TypeScript", stars: 56, url: "#", homepage: null, updated_at: "2026-04-01T00:00:00Z", archived: false, topics: [] },
  { id: 4, name: "use-stream", description: "React hook for SSE & streaming responses", language: "TypeScript", stars: 220, url: "#", homepage: null, updated_at: "2026-03-22T00:00:00Z", archived: false, topics: [] },
  { id: 5, name: "pg-migrate-lite", description: "Tiny migration runner for Postgres in Node", language: "JavaScript", stars: 34, url: "#", homepage: null, updated_at: "2026-03-15T00:00:00Z", archived: false, topics: [] },
  { id: 6, name: "feature-flag-rs", description: "Feature-flag SDK with rule evaluator", language: "Rust", stars: 47, url: "#", homepage: null, updated_at: "2026-03-08T00:00:00Z", archived: false, topics: [] },
  { id: 7, name: "next-actions-toolkit", description: "Validation + auth wrappers for Server Actions", language: "TypeScript", stars: 178, url: "#", homepage: null, updated_at: "2026-02-28T00:00:00Z", archived: false, topics: [] },
  { id: 8, name: "deno-cron", description: "Cron scheduler for Deno Deploy", language: "TypeScript", stars: 28, url: "#", homepage: null, updated_at: "2026-02-19T00:00:00Z", archived: false, topics: [] },
  { id: 9, name: "sql-tagged", description: "Composable SQL with tagged templates", language: "TypeScript", stars: 64, url: "#", homepage: null, updated_at: "2026-02-11T00:00:00Z", archived: false, topics: [] },
  { id: 10, name: "ws-broker", description: "Tiny pub/sub broker over WebSockets", language: "Go", stars: 41, url: "#", homepage: null, updated_at: "2026-02-04T00:00:00Z", archived: false, topics: [] },
  { id: 11, name: "mdx-blog-starter", description: "Minimal MDX blog with RSS + OG image gen", language: "TypeScript", stars: 96, url: "#", homepage: null, updated_at: "2026-01-26T00:00:00Z", archived: false, topics: [] },
  { id: 12, name: "zod-form", description: "Form bindings with Zod validation", language: "TypeScript", stars: 53, url: "#", homepage: null, updated_at: "2026-01-18T00:00:00Z", archived: false, topics: [] },
  { id: 13, name: "http-cli", description: "Minimal HTTP client CLI in Rust", language: "Rust", stars: 22, url: "#", homepage: null, updated_at: "2026-01-10T00:00:00Z", archived: false, topics: [] },
  { id: 14, name: "log-prism", description: "Structured logger with redaction", language: "TypeScript", stars: 37, url: "#", homepage: null, updated_at: "2025-12-30T00:00:00Z", archived: false, topics: [] },
  { id: 15, name: "react-virtual-list", description: "Virtualized list with sticky group headers", language: "TypeScript", stars: 71, url: "#", homepage: null, updated_at: "2025-12-22T00:00:00Z", archived: false, topics: [] },
  { id: 16, name: "pgvector-search", description: "Semantic search helpers for pgvector", language: "TypeScript", stars: 109, url: "#", homepage: null, updated_at: "2025-12-12T00:00:00Z", archived: false, topics: [] },
];

export const FEATURED_FALLBACK_REPOS: Repo[] = [
  {
    id: 1182966566,
    name: "Koda",
    description: "AI agent orchestration.",
    language: "Python",
    stars: 0,
    url: "https://github.com/ryan-mf-eloy/Koda",
    homepage: "https://koda.ryaneloy.dev",
    updated_at: "2026-06-08T01:35:50Z",
    archived: false,
    topics: [FEATURED_TOPIC, "portfolio-featured-1"],
  },
  {
    id: 1251827011,
    name: "Notchly",
    description: "Native macOS meeting assistant that lives near the MacBook notch.",
    language: "Swift",
    stars: 0,
    url: "https://github.com/ryan-mf-eloy/Notchly",
    homepage: null,
    updated_at: "2026-06-08T01:35:50Z",
    archived: false,
    topics: [FEATURED_TOPIC, "portfolio-featured-2"],
  },
  {
    id: 1233365086,
    name: "noble-ios-mvp",
    description: "Sports cards platform iOS MVP — marketplace, live auctions, 3D card viewer, portfolio analytics.",
    language: "Swift",
    stars: 0,
    url: "https://github.com/ryan-mf-eloy/noble-ios-mvp",
    homepage: null,
    updated_at: "2026-06-08T01:35:51Z",
    archived: false,
    topics: [FEATURED_TOPIC, "portfolio-featured-3"],
  },
];

const DAY = 86_400_000;

export function formatRelativeDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso).getTime();
  if (Number.isNaN(d)) return "";
  const diff = Date.now() - d;
  if (diff < DAY) return "today";
  if (diff < 2 * DAY) return "yesterday";
  if (diff < 30 * DAY) return `${Math.floor(diff / DAY)}d ago`;
  if (diff < 365 * DAY) return `${Math.floor(diff / (30 * DAY))}mo ago`;
  return `${Math.floor(diff / (365 * DAY))}y ago`;
}

const cache = new Map<number, Repo[]>();
const inflight = new Map<number, Promise<Repo[]>>();

type RawRepo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  html_url: string;
  homepage: string | null;
  updated_at: string;
  archived: boolean;
  topics?: string[];
};

function demoSlice(page: number): Repo[] {
  return DEMO_REPOS.slice((page - 1) * PER_PAGE, page * PER_PAGE);
}

export function parseRepoPageParam(value: string | null): number | null {
  if (value === null) return 1;
  if (!/^[1-9]\d{0,2}$/.test(value)) return null;

  const page = Number(value);
  return page <= MAX_REPO_PAGE ? page : null;
}

async function fetchJsonRepos(url: string, signal?: AbortSignal): Promise<Repo[]> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`repos ${response.status}`);
  return response.json() as Promise<Repo[]>;
}

function normalize(raw: RawRepo): Repo {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    language: raw.language,
    stars: raw.stargazers_count,
    url: raw.html_url,
    homepage: raw.homepage || null,
    updated_at: raw.updated_at,
    archived: raw.archived,
    topics: raw.topics ?? [],
  };
}

function featuredOrder(repo: Repo): number {
  const rankTopic = repo.topics.find((topic) =>
    topic.toLowerCase().startsWith(FEATURED_ORDER_PREFIX),
  );
  const rank = rankTopic ? Number(rankTopic.slice(FEATURED_ORDER_PREFIX.length)) : NaN;
  return Number.isFinite(rank) && rank > 0 ? rank : Number.MAX_SAFE_INTEGER;
}

function isFeaturedRepo(repo: Repo): boolean {
  return repo.topics.some((topic) => topic.toLowerCase() === FEATURED_TOPIC);
}

function sortFeaturedRepos(repos: Repo[]): Repo[] {
  return repos
    .filter(isFeaturedRepo)
    .sort((a, b) => {
      const rankDiff = featuredOrder(a) - featuredOrder(b);
      if (rankDiff !== 0) return rankDiff;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    })
    .slice(0, FEATURED_LIMIT);
}

function mergeFeaturedRepos(repos: Repo[]): Repo[] {
  const byName = new Map<string, Repo>();

  for (const repo of FEATURED_FALLBACK_REPOS) {
    byName.set(repo.name.toLowerCase(), repo);
  }

  for (const repo of repos) {
    byName.set(repo.name.toLowerCase(), repo);
  }

  return sortFeaturedRepos([...byName.values()]);
}

function mergeFeaturedFallbackIntoPage(repos: Repo[]): Repo[] {
  const byName = new Map<string, Repo>();

  for (const repo of FEATURED_FALLBACK_REPOS) {
    byName.set(repo.name.toLowerCase(), repo);
  }

  for (const repo of repos) {
    byName.set(repo.name.toLowerCase(), repo);
  }

  return [...byName.values()]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, PER_PAGE);
}

export async function fetchFeaturedRepos(signal?: AbortSignal): Promise<Repo[]> {
  if (typeof window !== "undefined") {
    try {
      return await fetchJsonRepos("/api/github/featured", signal);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") throw err;
      console.warn("[github] featured proxy failed, using fallback data:", err);
      return FEATURED_FALLBACK_REPOS;
    }
  }

  const collected: Repo[] = [];

  try {
    for (let page = 1; page <= 3; page += 1) {
      const url = `https://api.github.com/users/${encodeURIComponent(GH_USER)}/repos?per_page=100&sort=updated&page=${page}`;
      const response = await fetch(url, {
        headers: { Accept: "application/vnd.github+json" },
        signal,
      });

      if (!response.ok) throw new Error(`gh featured ${response.status}`);

      const raw: RawRepo[] = await response.json();
      collected.push(...raw.filter((repo) => !repo.fork).map(normalize));
      if (raw.length < 100) break;
    }

    return mergeFeaturedRepos(collected);
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    console.warn("[github] featured fetch failed, using fallback data:", err);
    return FEATURED_FALLBACK_REPOS;
  }
}

export async function fetchRepoPage(page: number, signal?: AbortSignal): Promise<Repo[]> {
  if (!Number.isInteger(page) || page < 1 || page > MAX_REPO_PAGE) {
    return [];
  }

  if (cache.has(page)) return cache.get(page)!;
  const pending = inflight.get(page);
  if (pending) return pending;

  if (typeof window !== "undefined") {
    const promise = fetchJsonRepos(`/api/github/repos?page=${page}`, signal)
      .then((repos) => {
        cache.set(page, repos);
        return repos;
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") throw err;
        const fallback =
          page === 1 ? mergeFeaturedFallbackIntoPage(demoSlice(page)) : demoSlice(page);
        cache.set(page, fallback);
        console.warn("[github] repo proxy failed, using demo data:", err);
        return fallback;
      })
      .finally(() => {
        inflight.delete(page);
      });

    inflight.set(page, promise);
    return promise;
  }

  const url = `https://api.github.com/users/${encodeURIComponent(GH_USER)}/repos?per_page=${PER_PAGE}&sort=updated&page=${page}`;

  const promise = fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
    signal,
  })
    .then(async (r) => {
      if (!r.ok) throw new Error(`gh ${r.status}`);
      const raw: RawRepo[] = await r.json();
      const cleaned = raw.filter((x) => !x.fork).map(normalize);
      const base = cleaned.length === 0 ? demoSlice(page) : cleaned;
      const result = page === 1 ? mergeFeaturedFallbackIntoPage(base) : base;
      cache.set(page, result);
      return result;
    })
    .catch((err: unknown) => {
      if (err instanceof DOMException && err.name === "AbortError") throw err;
      const fallback =
        page === 1 ? mergeFeaturedFallbackIntoPage(demoSlice(page)) : demoSlice(page);
      cache.set(page, fallback);
      console.warn("[github] fetch failed, using demo data:", err);
      return fallback;
    })
    .finally(() => {
      inflight.delete(page);
    });

  inflight.set(page, promise);
  return promise;
}
