import { OPEN_GRAPH_IMAGE_URL } from "@/lib/github";

const GH_USER = "ryan-mf-eloy";
const NAME_RE = /^[A-Za-z0-9._-]{1,100}$/;
const FIVE_MINUTES = 300;
const PREVIEW_PROBE_TIMEOUT_MS = 2_500;
const BRANCHES = ["master", "main"] as const;
const PREVIEW_FILES = ["preview.png", "preview.jpg", "preview.jpeg", "preview.webp"] as const;

export const runtime = "nodejs";

type PreviewCandidate = {
  file: string;
  url: string;
};

function rawPreviewUrl(name: string, branch: string, file: string): string {
  return `https://raw.githubusercontent.com/${GH_USER}/${encodeURIComponent(name)}/${branch}/${file}`;
}

function previewCandidates(name: string): PreviewCandidate[] {
  return BRANCHES.flatMap((branch) =>
    PREVIEW_FILES.map((file) => ({ file, url: rawPreviewUrl(name, branch, file) })),
  );
}

function isImageResponse(file: string, contentType: string): boolean {
  return (
    contentType.startsWith("image/") ||
    (contentType === "application/octet-stream" && /\.(png|jpe?g|webp)$/i.test(file))
  );
}

async function probePreview(candidate: PreviewCandidate): Promise<string> {
  const response = await fetch(candidate.url, {
    method: "HEAD",
    cache: "no-store",
    redirect: "follow",
    signal: AbortSignal.timeout(PREVIEW_PROBE_TIMEOUT_MS),
    headers: {
      Accept: "image/avif,image/webp,image/png,image/jpeg,*/*;q=0.1",
    },
  });

  if (!response.ok) throw new Error(`preview ${response.status}`);

  const contentType = response.headers.get("content-type") ?? "image/png";
  if (!isImageResponse(candidate.file, contentType)) {
    throw new Error(`preview content-type ${contentType}`);
  }

  return candidate.url;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  if (!NAME_RE.test(name)) {
    return new Response("Bad request", { status: 400 });
  }

  try {
    const upstream = await Promise.any(previewCandidates(name).map(probePreview));

    return new Response(null, {
      status: 307,
      headers: {
        Location: upstream,
        "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable",
      },
    });
  } catch {
    // No repository preview image is available; use the GitHub OpenGraph card.
  }

  return new Response(null, {
    status: 307,
    headers: {
      Location: OPEN_GRAPH_IMAGE_URL(name),
      "Cache-Control": `public, max-age=${FIVE_MINUTES}, s-maxage=${FIVE_MINUTES}`,
    },
  });
}
