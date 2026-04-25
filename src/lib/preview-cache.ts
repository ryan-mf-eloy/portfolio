const TTL_MS = 24 * 60 * 60 * 1000;
const KEY_PREFIX = "repo-preview:";

export type PreviewStatus = "loaded" | "error";

type CacheRecord = {
  status: PreviewStatus;
  ts: number;
};

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function readPreviewStatus(repoName: string): PreviewStatus | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(KEY_PREFIX + repoName);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheRecord;
    if (!parsed || typeof parsed.ts !== "number") return null;
    if (Date.now() - parsed.ts > TTL_MS) {
      localStorage.removeItem(KEY_PREFIX + repoName);
      return null;
    }
    return parsed.status === "loaded" || parsed.status === "error"
      ? parsed.status
      : null;
  } catch {
    return null;
  }
}

export function writePreviewStatus(
  repoName: string,
  status: PreviewStatus,
): void {
  if (!isBrowser()) return;
  try {
    const record: CacheRecord = { status, ts: Date.now() };
    localStorage.setItem(KEY_PREFIX + repoName, JSON.stringify(record));
  } catch {
    /* quota or privacy mode — ignore */
  }
}

export function warmPreview(url: string): void {
  if (!isBrowser()) return;
  // Force the browser to start fetching now so the <img> in the tooltip hits cache.
  const img = new Image();
  img.decoding = "async";
  img.src = url;
}
