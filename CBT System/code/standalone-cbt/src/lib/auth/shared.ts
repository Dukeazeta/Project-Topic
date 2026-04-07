const fallbackSecret = "standalone-cbt-dev-secret";

export function getAuthSecret() {
  return new TextEncoder().encode(process.env.AUTH_SECRET || fallbackSecret);
}
