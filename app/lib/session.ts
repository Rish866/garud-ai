import crypto from "crypto";

export const SESSION_COOKIE = "garud_session";

type SessionPayload = {
  tenantId?: string;
  tenantCode?: string;
  userId: string;
  email: string;
  role: string;
  isSuperAdmin?: boolean;
  exp: number;
};

function getSessionSecret() {
  return (
    process.env.GARUD_SESSION_SECRET ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "garud-local-session-secret"
  );
}

function base64Url(input: string | Buffer) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function fromBase64Url(input: string) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(normalized, "base64").toString("utf8");
}

function sign(value: string) {
  return base64Url(
    crypto.createHmac("sha256", getSessionSecret()).update(value).digest(),
  );
}

export function createSessionToken(payload: Omit<SessionPayload, "exp">) {
  const body = base64Url(
    JSON.stringify({
      ...payload,
      exp: Date.now() + 1000 * 60 * 60 * 12,
    }),
  );

  return `${body}.${sign(body)}`;
}

export function verifySessionToken(token?: string): SessionPayload | null {
  if (!token) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature || sign(body) !== signature) return null;

  try {
    const payload = JSON.parse(fromBase64Url(body)) as SessionPayload;
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function createPasswordHash(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 120000, 32, "sha256")
    .toString("hex");

  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;

  const inputHash = crypto
    .pbkdf2Sync(password, salt, 120000, 32, "sha256")
    .toString("hex");

  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(inputHash));
}
