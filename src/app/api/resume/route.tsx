import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { ResumeDocument } from "@/lib/resume/document";
import { loadResume } from "@/lib/resume/source";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const data = await loadResume();
    const buffer = await renderToBuffer(<ResumeDocument data={data} />);

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="ryan-eloy-resume.pdf"',
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  } catch (err) {
    console.error("[/api/resume] generation failed:", err);
    return NextResponse.json(
      { error: "Failed to generate resume" },
      { status: 500 },
    );
  }
}
