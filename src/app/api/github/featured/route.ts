import { NextResponse } from "next/server";
import { fetchFeaturedRepos } from "@/lib/github";

export const runtime = "nodejs";

export async function GET() {
  const repos = await fetchFeaturedRepos();

  return NextResponse.json(repos, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=300",
    },
  });
}
