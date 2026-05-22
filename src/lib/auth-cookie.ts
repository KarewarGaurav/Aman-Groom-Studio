const AUTH_COOKIE = "aman-auth";

export function setAuthCookie(token: string, maxAgeSeconds: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

export function clearAuthCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export const AUTH_COOKIE_NAME = AUTH_COOKIE;
