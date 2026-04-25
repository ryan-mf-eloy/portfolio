import { assertResume, type Resume } from "@/lib/resume/schema";
import fallback from "@/data/resume-fallback.json";

const REVALIDATE_SECONDS = 300;

export async function loadResume(): Promise<Resume> {
  const url = process.env.RESUME_GIST_URL;

  if (url) {
    try {
      const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
      if (!res.ok) {
        console.warn(`[resume] gist responded ${res.status}, falling back to bundled JSON`);
      } else {
        const data = await res.json();
        return assertResume(data);
      }
    } catch (err) {
      console.warn("[resume] gist fetch failed, falling back to bundled JSON:", err);
    }
  }

  return assertResume(fallback);
}
