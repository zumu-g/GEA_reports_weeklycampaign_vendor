import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "File must be a PDF" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Dynamic import keeps pdf-parse (CJS) out of the Turbopack module graph
  const { default: pdfParse } = await import("pdf-parse");
  const { text } = await pdfParse(buffer);

  return NextResponse.json({ text });
}
