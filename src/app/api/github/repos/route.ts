import { NextResponse } from "next/server";
import { fetchRepoPage, parseRepoPageParam } from "@/lib/github";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseRepoPageParam(searchParams.get("page"));

  if (page === null) {
    return NextResponse.json(
      { error: "Invalid page" },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  const repos = await fetchRepoPage(page);

  return NextResponse.json(repos, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=300",
    },
  });
}
