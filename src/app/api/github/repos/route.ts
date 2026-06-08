import { NextResponse } from "next/server";
import { fetchRepoPage } from "@/lib/github";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
  const repos = await fetchRepoPage(page);

  return NextResponse.json(repos, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=300",
    },
  });
}
