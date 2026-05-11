import { NextRequest, NextResponse } from "next/server";
import { callMiniMax } from "@/lib/minimax";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "MINIMAX_API_KEY not configured" }, { status: 500 });
  }

  const { weekEnding } = await req.json() as { weekEnding?: string };

  const prompt = `You are a Melbourne real estate market analyst with deep knowledge of the Casey and Cardinia local government areas in Victoria's outer south-east.

Generate exactly 3 concise market talking points that a GEA real estate agent could share with a vendor in the week ending ${weekEnding ?? "this week"}.

Each talking point should be a credible observation about the Casey/Cardinia property market — covering things like:
- Auction clearance rates and demand trends in the corridor
- Interest rate environment and buyer confidence
- Infrastructure projects affecting values (Pakenham rail corridor, road upgrades)
- Seasonal market patterns
- Price movements or comparison to inner/middle suburbs
- First home buyer activity and government incentives

Format your response as a JSON array of exactly 3 objects:
[
  { "title": "Short headline (max 10 words)", "note": "2-3 sentence commentary the agent can adapt for their vendor" },
  ...
]

Return only the JSON array. No preamble, no markdown fences.`;

  try {
    const content = await callMiniMax(apiKey, [{ role: "user", content: prompt }], {
      temperature: 0.7,
      max_tokens: 4000,
    });

    let articles: { title: string; note: string }[];
    try {
      articles = JSON.parse(content);
    } catch {
      const match = content.match(/\[[\s\S]*\]/);
      articles = match ? JSON.parse(match[0]) : [];
    }

    return NextResponse.json({ articles });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
