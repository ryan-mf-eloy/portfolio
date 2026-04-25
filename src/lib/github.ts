export const PER_PAGE = 8;
const GH_USER = "ryan-mf-eloy";

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
  updated_at: string;
  archived: boolean;
  topics: string[];
};

export const PREVIEW_IMAGE_URL = (name: string) =>
  `/api/preview/${encodeURIComponent(name)}`;

export const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Rust: "#dea584",
  Go: "#00add8",
  Python: "#3572a5",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Java: "#b07219",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  C: "#555555",
  "C++": "#f34b7d",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

export function languageColor(lang: string | null | undefined): string {
  if (!lang) return "#888";
  return LANG_COLORS[lang] ?? "#888";
}

export const DEMO_REPOS: Repo[] = [
  { id: 1, name: "react-typed-routes", description: "Type-safe route helpers for Next.js & React Router", language: "TypeScript", stars: 142, url: "#", updated_at: "2026-04-12T00:00:00Z", archived: false, topics: [] },
  { id: 2, name: "ts-result", description: "Lightweight Result/Either type with zero deps", language: "TypeScript", stars: 89, url: "#", updated_at: "2026-04-08T00:00:00Z", archived: false, topics: [] },
  { id: 3, name: "edge-cache-kit", description: "Cache primitives for Vercel + Cloudflare workers", language: "TypeScript", stars: 56, url: "#", updated_at: "2026-04-01T00:00:00Z", archived: false, topics: [] },
  { id: 4, name: "use-stream", description: "React hook for SSE & streaming responses", language: "TypeScript", stars: 220, url: "#", updated_at: "2026-03-22T00:00:00Z", archived: false, topics: [] },
  { id: 5, name: "pg-migrate-lite", description: "Tiny migration runner for Postgres in Node", language: "JavaScript", stars: 34, url: "#", updated_at: "2026-03-15T00:00:00Z", archived: false, topics: [] },
  { id: 6, name: "feature-flag-rs", description: "Feature-flag SDK with rule evaluator", language: "Rust", stars: 47, url: "#", updated_at: "2026-03-08T00:00:00Z", archived: false, topics: [] },
  { id: 7, name: "next-actions-toolkit", description: "Validation + auth wrappers for Server Actions", language: "TypeScript", stars: 178, url: "#", updated_at: "2026-02-28T00:00:00Z", archived: false, topics: [] },
  { id: 8, name: "deno-cron", description: "Cron scheduler for Deno Deploy", language: "TypeScript", stars: 28, url: "#", updated_at: "2026-02-19T00:00:00Z", archived: false, topics: [] },
  { id: 9, name: "sql-tagged", description: "Composable SQL with tagged templates", language: "TypeScript", stars: 64, url: "#", updated_at: "2026-02-11T00:00:00Z", archived: false, topics: [] },
  { id: 10, name: "ws-broker", description: "Tiny pub/sub broker over WebSockets", language: "Go", stars: 41, url: "#", updated_at: "2026-02-04T00:00:00Z", archived: false, topics: [] },
  { id: 11, name: "mdx-blog-starter", description: "Minimal MDX blog with RSS + OG image gen", language: "TypeScript", stars: 96, url: "#", updated_at: "2026-01-26T00:00:00Z", archived: false, topics: [] },
  { id: 12, name: "zod-form", description: "Form bindings with Zod validation", language: "TypeScript", stars: 53, url: "#", updated_at: "2026-01-18T00:00:00Z", archived: false, topics: [] },
  { id: 13, name: "http-cli", description: "Minimal HTTP client CLI in Rust", language: "Rust", stars: 22, url: "#", updated_at: "2026-01-10T00:00:00Z", archived: false, topics: [] },
  { id: 14, name: "log-prism", description: "Structured logger with redaction", language: "TypeScript", stars: 37, url: "#", updated_at: "2025-12-30T00:00:00Z", archived: false, topics: [] },
  { id: 15, name: "react-virtual-list", description: "Virtualized list with sticky group headers", language: "TypeScript", stars: 71, url: "#", updated_at: "2025-12-22T00:00:00Z", archived: false, topics: [] },
  { id: 16, name: "pgvector-search", description: "Semantic search helpers for pgvector", language: "TypeScript", stars: 109, url: "#", updated_at: "2025-12-12T00:00:00Z", archived: false, topics: [] },
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
  updated_at: string;
  archived: boolean;
  topics?: string[];
};

function demoSlice(page: number): Repo[] {
  return DEMO_REPOS.slice((page - 1) * PER_PAGE, page * PER_PAGE);
}

function normalize(raw: RawRepo): Repo {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    language: raw.language,
    stars: raw.stargazers_count,
    url: raw.html_url,
    updated_at: raw.updated_at,
    archived: raw.archived,
    topics: raw.topics ?? [],
  };
}

export async function fetchRepoPage(page: number, signal?: AbortSignal): Promise<Repo[]> {
  if (cache.has(page)) return cache.get(page)!;
  const pending = inflight.get(page);
  if (pending) return pending;

  const url = `https://api.github.com/users/${encodeURIComponent(GH_USER)}/repos?per_page=${PER_PAGE}&sort=updated&page=${page}`;

  const promise = fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
    signal,
  })
    .then(async (r) => {
      if (!r.ok) throw new Error(`gh ${r.status}`);
      const raw: RawRepo[] = await r.json();
      const cleaned = raw.filter((x) => !x.fork).map(normalize);
      const result = cleaned.length === 0 ? demoSlice(page) : cleaned;
      cache.set(page, result);
      return result;
    })
    .catch((err: unknown) => {
      if (err instanceof DOMException && err.name === "AbortError") throw err;
      const fallback = demoSlice(page);
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
