import { NextRequest, NextResponse } from "next/server";
import { callMiniMax } from "@/lib/minimax";

export const runtime = "nodejs";
export const maxDuration = 30;

const SYSTEM_PROMPT = `You extract portal performance statistics from real estate PDF report exports.
Extract these four aggregate/total metrics (use null if a metric cannot be found):
- views: total property page views (REA: "Views"; Domain: "Views", "Property views")
- enquiries: total email enquiries or contact requests (REA: "Enquiries"; Domain: "Email enquiries")
- saves: total saves, shortlists, or favourites (REA: "Shortlisted"; Domain: "Saves", "Saved")
- searchAppearances: total search impressions or appearances (REA: "Search impressions"; Domain: "Search impressions")

If there are multiple rows (e.g. daily/weekly breakdown), use the grand total row or sum all rows.
Respond with a valid JSON object only — no explanation, no markdown fences:
{"views": 1234, "enquiries": 12, "saves": 45, "searchAppearances": 6789}`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "MINIMAX_API_KEY is not configured" }, { status: 500 });
  }

  let text: string;
  let portal: string;
  try {
    ({ text, portal } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!text || typeof text !== "string") {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  const portalName = portal === "domain" ? "domain.com.au" : "realestate.com.au";

  try {
    const content = await callMiniMax(
      apiKey,
      [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Extract the 4 stats from this ${portalName} export:\n\n${text.slice(0, 4000)}`,
        },
      ],
      { temperature: 0.1, max_tokens: 400 }
    );

    let parsed: { views: number | null; enquiries: number | null; saves: number | null; searchAppearances: number | null };
    try {
      parsed = JSON.parse(content);
    } catch {
      const match = content.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Could not parse stats JSON from response");
      parsed = JSON.parse(match[0]);
    }

    return NextResponse.json({
      views: parsed.views ?? null,
      enquiries: parsed.enquiries ?? null,
      saves: parsed.saves ?? null,
      searchAppearances: parsed.searchAppearances ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
