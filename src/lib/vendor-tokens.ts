import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const TOKENS_FILE = path.join(process.cwd(), 'src/lib/vendor-tokens.json');

function readTokens(): Record<string, string> {
  try {
    return JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function writeTokens(tokens: Record<string, string>): void {
  fs.writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 2) + '\n', 'utf-8');
}

export function getPropertySlugForToken(token: string): string | null {
  const tokens = readTokens();
  return tokens[token] ?? null;
}

export function getTokenForSlug(slug: string): string | null {
  const tokens = readTokens();
  const entry = Object.entries(tokens).find(([, s]) => s === slug);
  return entry ? entry[0] : null;
}

export function generateToken(): string {
  return crypto.randomBytes(9).toString('base64url').slice(0, 12);
}

export function assignToken(slug: string): string {
  const tokens = readTokens();
  const existing = Object.entries(tokens).find(([, s]) => s === slug);
  if (existing) return existing[0];
  const token = generateToken();
  tokens[token] = slug;
  writeTokens(tokens);
  return token;
}

export function revokeToken(token: string): void {
  const tokens = readTokens();
  delete tokens[token];
  writeTokens(tokens);
}

export function getAllTokens(): Record<string, string> {
  return readTokens();
}
