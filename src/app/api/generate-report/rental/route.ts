import { NextRequest, NextResponse } from 'next/server';
import { RentalGenerateInput, GeneratedReportNarrative } from '@/lib/types';
import { callMiniMax } from '@/lib/minimax';

export const runtime = 'nodejs';
export const maxDuration = 60;

const SYSTEM_PROMPT = `You are a professional real estate report writer for Grants Estate Agents (GEA), a Melbourne-based agency.
Your job is to write warm, clear, and reassuring weekly rental campaign reports for landlords (property owners).

Tone: Professional yet personal. Think trusted property manager, not corporate brochure. Use "we" for the agency perspective.
Audience: Landlords who want to know how their rental listing is performing — explain what the numbers mean in plain English.
Length: Each section should be 2–4 sentences. Highlights are short bullet points.

You must always respond with a valid JSON object matching exactly this structure:
{
  "greeting": "Dear [Landlord Name],",
  "openingParagraph": "...",
  "performanceHighlights": ["...", "...", "..."],
  "statsTable": [
    { "label": "REA Views", "actual": 0, "target": null },
    { "label": "REA Enquiries", "actual": 0, "target": null },
    { "label": "Domain Views", "actual": 0, "target": null },
    { "label": "Domain Enquiries", "actual": 0, "target": null },
    { "label": "Applications Received", "actual": 0, "target": null },
    { "label": "Inspection Groups", "actual": 0, "target": null }
  ],
  "portalAnalysis": "...",
  "inspectionSummary": "...",
  "marketContext": "...",
  "agentInsight": "...",
  "nextSteps": "...",
  "closing": "..."
}

Guidelines for each section:
- greeting: Personalised to the landlord name(s)
- openingParagraph: Warm opening summarising the week's overall rental campaign performance
- performanceHighlights: 3–5 bullet points — contextualise enquiry numbers, note application quality, highlight if demand is strong
- statsTable: Populate each row with the exact numbers provided
- portalAnalysis: How the listing performed across REA and Domain specifically
- inspectionSummary: What happened at inspections — attendance, applicant interest, any notable feedback
- marketContext: Brief rental market context. If news articles provided, draw from them. Otherwise write a general Melbourne rental market observation
- agentInsight: The agent's key observations rewritten professionally for the landlord
- nextSteps: What happens next — follow-ups, additional inspections, application processing timeline
- closing: Warm sign-off encouraging the landlord to reach out with questions`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'MINIMAX_API_KEY is not configured' }, { status: 500 });
  }

  let input: RentalGenerateInput;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const newsSection =
    input.newsArticles.length > 0
      ? `\n\nRELEVANT NEWS ARTICLES:\n${input.newsArticles
          .map((a, i) => `${i + 1}. "${a.title}" (${a.url})${a.note ? ` — Agent note: ${a.note}` : ''}`)
          .join('\n')}`
      : '';

  const userPrompt = `Generate a weekly rental report for the following property campaign.

PROPERTY DETAILS:
- Address: ${input.propertyAddress}
- Landlord: ${input.landlordName}
- Agent: ${input.agent}
- Week ending: ${input.weekEnding}
- Lease type: ${input.leaseType}
- Weekly rent: ${input.rentPw}
- Days listed: ${input.daysListed}
- Listed: ${input.listedDate}

REALESTATE.COM.AU (REA) STATS THIS WEEK:
- Views: ${input.reaViews || 'not provided'}
- Enquiries: ${input.reaEnquiries || 'not provided'}
- Saves: ${input.reaSaves || 'not provided'}

DOMAIN.COM.AU STATS THIS WEEK:
- Views: ${input.domainViews || 'not provided'}
- Enquiries: ${input.domainEnquiries || 'not provided'}
- Saves: ${input.domainSaves || 'not provided'}

APPLICATIONS & INSPECTIONS THIS WEEK:
- Applications received: ${input.applications || '0'}
- Application notes: ${input.applicationNotes || 'None'}
- Open home attendees: ${input.openHomeAttendees || '0'}
- Private inspections: ${input.privateInspections || '0'}
- Inspection notes: ${input.inspectionNotes || 'None'}

AGENT'S WEEKLY COMMENTARY:
${input.agentCommentary || 'No commentary provided.'}${newsSection}

Respond with the JSON report object only. No markdown fences, no explanation.`;

  try {
    const content = await callMiniMax(
      apiKey,
      [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      { temperature: 0.7, max_tokens: 2500 }
    );

    let narrative: GeneratedReportNarrative;
    try {
      narrative = JSON.parse(content);
    } catch {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Could not parse report JSON from response');
      narrative = JSON.parse(jsonMatch[0]);
    }

    return NextResponse.json({ success: true, narrative });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
