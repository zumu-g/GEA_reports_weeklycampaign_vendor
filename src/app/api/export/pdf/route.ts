import { NextRequest, NextResponse } from 'next/server';
import { getProperty } from '@/lib/markdown-loader';
import { propertyToVendorReport } from '@/lib/data-adapter';

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('property');

  if (!slug) {
    return NextResponse.json({ error: 'Missing property parameter' }, { status: 400 });
  }

  const property = await getProperty(slug);
  if (!property) {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  }

  const report = propertyToVendorReport(property);
  const totalViews = report.reaViews + report.domainViews;
  const totalEnquiries = report.reaEnquiries + report.domainEnquiries;
  const totalSaves = report.reaSaves + report.domainSaves;
  const totalInspections = report.openHomeAttendees + report.privateInspections;

  // Cumulative totals
  const cumViews = property.analytics.reduce((s, a) => s + a.reaViews + a.domainViews, 0);
  const cumEnquiries = property.analytics.reduce((s, a) => s + a.reaEnquiries + a.domainEnquiries, 0);
  const cumInspections = property.inspections.reduce((s, i) => s + i.groups, 0);

  const checklistDone = property.checklist.filter(c => c.done).length;
  const today = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

  // Generate clean HTML for PDF printing
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Campaign Report — ${property.address}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1d1d1f; background: white; padding: 40px; max-width: 800px; margin: 0 auto; }
    h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
    h2 { font-size: 16px; font-weight: 600; margin: 24px 0 12px; border-bottom: 1px solid #e5e5e5; padding-bottom: 8px; }
    .meta { color: #86868b; font-size: 13px; margin-bottom: 24px; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 16px 0; }
    .stat-card { background: #f5f5f7; border-radius: 12px; padding: 16px; text-align: center; }
    .stat-value { font-size: 28px; font-weight: 700; }
    .stat-label { font-size: 11px; color: #86868b; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; margin: 8px 0; }
    th { text-align: left; font-weight: 600; padding: 8px 12px; background: #f5f5f7; border: 1px solid #e5e5e5; }
    td { padding: 8px 12px; border: 1px solid #e5e5e5; }
    .checklist-item { padding: 4px 0; font-size: 13px; }
    .done { color: #34c759; }
    .pending { color: #86868b; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e5e5; font-size: 11px; color: #86868b; text-align: center; }
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .portal-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; border-bottom: 1px solid #f5f5f7; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
    <div>
      <h1>${property.address}</h1>
      <p class="meta">
        ${report.campaignType || 'Private Sale'} · ${report.daysOnMarket} days on market · Agent: ${report.agent}<br>
        ${property.priceGuide ? `Price Guide: ${property.priceGuide}` : ''}
      </p>
    </div>
    <div style="text-align: right;">
      <div style="width: 40px; height: 40px; background: #1d1d1f; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-left: auto;">
        <span style="color: white; font-size: 10px; font-weight: 700;">GEA</span>
      </div>
      <p class="meta" style="margin-top: 4px;">${today}</p>
    </div>
  </div>

  <h2>This Week</h2>
  <div class="stats-grid">
    <div class="stat-card"><div class="stat-value">${totalViews.toLocaleString()}</div><div class="stat-label">Views</div></div>
    <div class="stat-card"><div class="stat-value">${totalEnquiries}</div><div class="stat-label">Enquiries</div></div>
    <div class="stat-card"><div class="stat-value">${totalSaves}</div><div class="stat-label">Saves</div></div>
    <div class="stat-card"><div class="stat-value">${totalInspections}</div><div class="stat-label">Inspections</div></div>
  </div>

  <h2>Campaign Totals</h2>
  <div class="stats-grid">
    <div class="stat-card"><div class="stat-value">${cumViews.toLocaleString()}</div><div class="stat-label">Total Views</div></div>
    <div class="stat-card"><div class="stat-value">${cumEnquiries}</div><div class="stat-label">Total Enquiries</div></div>
    <div class="stat-card"><div class="stat-value">${cumInspections}</div><div class="stat-label">Total Inspections</div></div>
    <div class="stat-card"><div class="stat-value">${property.analytics.length}</div><div class="stat-label">Weeks Tracked</div></div>
  </div>

  <h2>Portal Breakdown</h2>
  <div class="two-col">
    <div>
      <p style="font-weight: 600; font-size: 13px; margin-bottom: 8px;">realestate.com.au</p>
      <div class="portal-row"><span>Views</span><span>${report.reaViews.toLocaleString()}</span></div>
      <div class="portal-row"><span>Enquiries</span><span>${report.reaEnquiries}</span></div>
      <div class="portal-row"><span>Saves</span><span>${report.reaSaves}</span></div>
    </div>
    <div>
      <p style="font-weight: 600; font-size: 13px; margin-bottom: 8px;">domain.com.au</p>
      <div class="portal-row"><span>Views</span><span>${report.domainViews.toLocaleString()}</span></div>
      <div class="portal-row"><span>Enquiries</span><span>${report.domainEnquiries}</span></div>
      <div class="portal-row"><span>Saves</span><span>${report.domainSaves}</span></div>
    </div>
  </div>

  ${property.analytics.length > 0 ? `
  <h2>Weekly Analytics History</h2>
  <table>
    <tr><th>Week</th><th>REA Views</th><th>REA Enq</th><th>DOM Views</th><th>DOM Enq</th><th>Total</th></tr>
    ${property.analytics.map(a => `
    <tr>
      <td>${a.weekEnding}</td>
      <td>${a.reaViews}</td>
      <td>${a.reaEnquiries}</td>
      <td>${a.domainViews}</td>
      <td>${a.domainEnquiries}</td>
      <td><strong>${a.reaViews + a.domainViews}</strong></td>
    </tr>`).join('')}
  </table>` : ''}

  ${property.inspections.length > 0 ? `
  <h2>Inspection History</h2>
  <table>
    <tr><th>Date</th><th>Type</th><th>Groups</th><th>Interest</th><th>Notes</th></tr>
    ${property.inspections.map(i => `
    <tr>
      <td>${i.date}</td>
      <td>${i.type}</td>
      <td>${i.groups}</td>
      <td>${i.interestLevel}</td>
      <td>${i.notes}</td>
    </tr>`).join('')}
  </table>` : ''}

  ${property.offers.length > 0 ? `
  <h2>Offers Received</h2>
  <table>
    <tr><th>Date</th><th>Buyer</th><th>Amount</th><th>Conditions</th><th>Status</th></tr>
    ${property.offers.map(o => `
    <tr>
      <td>${o.date}</td>
      <td>${o.buyer}</td>
      <td>${o.amount}</td>
      <td>${o.conditions}</td>
      <td>${o.status}</td>
    </tr>`).join('')}
  </table>` : ''}

  <h2>Campaign Checklist (${checklistDone}/${property.checklist.length})</h2>
  ${property.checklist.map(c => `
    <div class="checklist-item ${c.done ? 'done' : 'pending'}">
      ${c.done ? '✓' : '○'} ${c.task}
    </div>`).join('')}

  <div class="footer">
    <p>Grants Estate Agents · Campaign Report generated ${today}</p>
    <p style="margin-top: 4px;">This report is confidential and prepared for ${property.owner}</p>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `inline; filename="Campaign-Report-${slug}.html"`,
    },
  });
}
