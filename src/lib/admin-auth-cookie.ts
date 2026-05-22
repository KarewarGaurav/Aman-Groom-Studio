const ADMIN_COOKIE = "aman-admin-auth";

export function setAdminAuthCookie(token: string, maxAgeSeconds: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${ADMIN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

export function clearAdminAuthCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${ADMIN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export const ADMIN_COOKIE_NAME = ADMIN_COOKIE;

export const ADMIN_SESSION_MS = 8 * 60 * 60 * 1000;
export const ADMIN_REMEMBER_MS = 7 * 24 * 60 * 60 * 1000;
