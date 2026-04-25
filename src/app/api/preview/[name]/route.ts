const GH_USER = "ryan-mf-eloy";
const NAME_RE = /^[A-Za-z0-9._-]{1,100}$/;
const ONE_DAY = 86_400;

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  if (!NAME_RE.test(name)) {
    return new Response("Bad request", { status: 400 });
  }

  const upstream = `https://raw.githubusercontent.com/${GH_USER}/${name}/master/preview.png`;

  try {
    const res = await fetch(upstream, {
      next: { revalidate: ONE_DAY },
    });

    if (!res.ok) {
      return new Response("Not found", {
        status: res.status === 404 ? 404 : 502,
        headers: { "Cache-Control": "public, max-age=300, s-maxage=300" },
      });
    }

    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") ?? "image/png";

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable",
      },
    });
  } catch {
    return new Response("Upstream error", { status: 502 });
  }
}
