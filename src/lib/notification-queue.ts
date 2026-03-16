import fs from 'fs/promises';
import path from 'path';

const PROPERTIES_DIR = process.env.PROPERTIES_DIR || '/Users/stuartgrant_mbp13/Library/Mobile Documents/com~apple~CloudDocs/GEA_vendor_portal/properties';

export interface QueuedNotification {
  id: string;
  type: string;
  title: string;
  timestamp: string;
  seen: boolean;
  data: Record<string, unknown>;
}

export async function queueNotification(
  slug: string,
  notification: { type: string; title: string; data: Record<string, unknown> }
): Promise<string> {
  const id = `${notification.type}_${Date.now()}`;
  const timestamp = new Date().toISOString();

  // 1. Write to portal-side unseen.json
  const notifDir = path.join(PROPERTIES_DIR, slug, 'notifications');
  await fs.mkdir(notifDir, { recursive: true });

  const unseenPath = path.join(notifDir, 'unseen.json');
  let existing: { items: QueuedNotification[] } = { items: [] };

  try {
    const raw = await fs.readFile(unseenPath, 'utf-8');
    existing = JSON.parse(raw);
  } catch { /* file doesn't exist yet */ }

  existing.items.unshift({
    id,
    type: notification.type,
    title: notification.title,
    timestamp,
    seen: false,
    data: notification.data,
  });

  // Keep only last 50
  existing.items = existing.items.slice(0, 50);
  await fs.writeFile(unseenPath, JSON.stringify(existing, null, 2), 'utf-8');

  // 2. Write to outbound queue for Python dispatcher
  const outboundDir = path.join(PROPERTIES_DIR, '_outbound');
  await fs.mkdir(outboundDir, { recursive: true });

  const outboundFile = path.join(outboundDir, `${id}.json`);
  await fs.writeFile(outboundFile, JSON.stringify({
    id,
    slug,
    type: notification.type,
    title: notification.title,
    data: notification.data,
    timestamp,
  }, null, 2), 'utf-8');

  return id;
}

export async function getUnseenNotifications(slug: string): Promise<{ items: QueuedNotification[]; unseenCount: number }> {
  const unseenPath = path.join(PROPERTIES_DIR, slug, 'notifications', 'unseen.json');

  try {
    const raw = await fs.readFile(unseenPath, 'utf-8');
    const data: { items: QueuedNotification[] } = JSON.parse(raw);
    const unseenCount = data.items.filter(i => !i.seen).length;
    return { items: data.items, unseenCount };
  } catch {
    return { items: [], unseenCount: 0 };
  }
}

export async function markNotificationsSeen(slug: string, notificationIds: string[]): Promise<void> {
  const unseenPath = path.join(PROPERTIES_DIR, slug, 'notifications', 'unseen.json');

  try {
    const raw = await fs.readFile(unseenPath, 'utf-8');
    const data: { items: QueuedNotification[] } = JSON.parse(raw);

    for (const item of data.items) {
      if (notificationIds.includes(item.id)) {
        item.seen = true;
      }
    }

    await fs.writeFile(unseenPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch { /* file doesn't exist */ }
}
