import { getUserById } from "@/lib/user-registry";
import type { AuthSession } from "@/types/auth";

const SESSION_MS = 30 * 60 * 1000;

export function isSessionValid(session: AuthSession | null): boolean {
  if (!session) return false;
  const now = Date.now();
  if (now > session.expiresAt) return false;
  if (!session.rememberMe && now - session.lastActivity > SESSION_MS) {
    return false;
  }
  return !!getUserById(session.userId);
}
