import { NextRequest, NextResponse } from "next/server";
import { GenerateReportInput, GeneratedReportNarrative } from "@/lib/types";
import { callMiniMax } from "@/lib/minimax";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM_PROMPT = `You are a professional real estate report writer for Grants Estate Agents (GEA), a Melbourne-based agency.
Your job is to write warm, clear, and reassuring weekly campaign reports for property vendors (sellers).

Tone: Professional yet personal. Think trusted advisor, not corporate brochure. Use "we" for the agency perspective.
Audience: Property sellers who may not be deeply familiar with real estate metrics — explain what the numbers mean in plain English.
Length: Each section should be 2–4 sentences. Highlights are short bullet points.

You must always respond with a valid JSON object matching exactly this structure:
{
  "greeting": "Dear [Vendor Name],",
  "openingParagraph": "...",
  "performanceHighlights": ["...", "...", "..."],
  "statsTable": [
    { "label": "REA Views", "actual": 0, "target": null },
    { "label": "REA Enquiries", "actual": 0, "target": null },
    { "label": "REA Saves", "actual": 0, "target": null },
    { "label": "Domain Views", "actual": 0, "target": null },
    { "label": "Domain Enquiries", "actual": 0, "target": null },
    { "label": "Domain Saves", "actual": 0, "target": null },
    { "label": "Open Home", "actual": 0, "target": null }
  ],
  "portalAnalysis": "...",
  "inspectionSummary": "...",
  "marketContext": "...",
  "agentInsight": "...",
  "nextSteps": "...",
  "closing": "..."
}

Guidelines for each section:
- greeting: Personalised to the vendor name(s)
- openingParagraph: Warm opening summarising the week's overall performance in 1-2 sentences
- performanceHighlights: 3-5 bullet points of the most notable stats. Always contextualise numbers — explain what they mean for the vendor, note if actual exceeds or falls below target where targets are provided
- statsTable: Populate each row with the exact numbers provided. Set "target" to null if no target was given for that metric, otherwise use the integer target value
- portalAnalysis: How the listing performed across REA and Domain specifically. Note any significant differences between portals
- inspectionSummary: What happened at inspections — attendance, buyer interest, any notable buyer feedback the agent shared
- marketContext: Brief market context drawn from any news articles provided. If no articles, write a general current Melbourne market observation
- agentInsight: The agent's key observations rewritten in a professional tone for the vendor
- nextSteps: What the agent/vendor will do next week — specific and actionable
- closing: Warm professional sign-off encouraging the vendor to reach out with questions`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "MINIMAX_API_KEY is not configured" },
      { status: 500 }
    );
  }

  let input: GenerateReportInput;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const newsSection =
    input.newsArticles.length > 0
      ? `\n\nRELEVANT NEWS ARTICLES:\n${input.newsArticles
          .map((a, i) => `${i + 1}. "${a.title}" (${a.url})${a.note ? ` — Agent note: ${a.note}` : ""}`)
          .join("\n")}`
      : "";

  const reaRawSection = input.reaFileContent
    ? `\n\nREA RAW REPORT DATA (use to verify/supplement the stats above):\n${input.reaFileContent.slice(0, 3000)}`
    : "";

  const domainRawSection = input.domainFileContent
    ? `\n\nDOMAIN RAW REPORT DATA (use to verify/supplement the stats above):\n${input.domainFileContent.slice(0, 3000)}`
    : "";

  const userPrompt = `Generate a weekly vendor report for the following property campaign.

PROPERTY DETAILS:
- Address: ${input.propertyAddress}
- Vendor: ${input.vendorName}
- Agent: ${input.agent}
- Week ending: ${input.weekEnding}
- Campaign type: ${input.campaignType}
- Asking price: ${input.askingPrice}
- Days on market: ${input.daysOnMarket}
- Listed: ${input.listingDate}

REALESTATE.COM.AU (REA) STATS THIS WEEK (actual vs target):
- Views: ${input.reaViews || "not provided"}${input.reaViewsTarget ? ` (target: ${input.reaViewsTarget})` : ""}
- Enquiries: ${input.reaEnquiries || "not provided"}${input.reaEnquiriesTarget ? ` (target: ${input.reaEnquiriesTarget})` : ""}
- Saves: ${input.reaSaves || "not provided"}${input.reaSavesTarget ? ` (target: ${input.reaSavesTarget})` : ""}
- Search appearances: ${input.reaSearchAppearances || "not provided"}

DOMAIN.COM.AU STATS THIS WEEK (actual vs target):
- Views: ${input.domainViews || "not provided"}${input.domainViewsTarget ? ` (target: ${input.domainViewsTarget})` : ""}
- Enquiries: ${input.domainEnquiries || "not provided"}${input.domainEnquiriesTarget ? ` (target: ${input.domainEnquiriesTarget})` : ""}
- Saves: ${input.domainSaves || "not provided"}${input.domainSavesTarget ? ` (target: ${input.domainSavesTarget})` : ""}
- Search appearances: ${input.domainSearchAppearances || "not provided"}

INSPECTIONS THIS WEEK (actual vs target):
- Open home attendees: ${input.openHomeAttendees || "0"}${input.openHomeAttendeesTarget ? ` (target: ${input.openHomeAttendeesTarget})` : ""}
- Private inspections: ${input.privateInspections || "0"}${
    input.inspectionNotes ? `\n- Agent notes: ${input.inspectionNotes}` : ""
  }

AGENT'S WEEKLY COMMENTARY:
${input.agentCommentary || "No commentary provided."}${newsSection}${reaRawSection}${domainRawSection}

Respond with the JSON report object only. No markdown fences, no explanation.`;

  try {
    const content = await callMiniMax(
      apiKey,
      [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      { temperature: 0.7, max_tokens: 2500 }
    );

    // stripThinking already applied by callMiniMax
    let narrative: GeneratedReportNarrative;
    try {
      narrative = JSON.parse(content);
    } catch {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Could not parse report JSON from response");
      narrative = JSON.parse(jsonMatch[0]);
    }

    return NextResponse.json({ success: true, narrative });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
