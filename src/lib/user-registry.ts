import { createDemoUserRecord } from "@/data/demo-auth";
import type { StoredUserRecord } from "@/types/auth";

const REGISTRY_KEY = "aman-groom-user-registry";

function loadRegistry(): Record<string, StoredUserRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(REGISTRY_KEY);
    if (!raw) return seedRegistry();
    const parsed = JSON.parse(raw) as Record<string, StoredUserRecord>;
    return Object.keys(parsed).length > 0 ? parsed : seedRegistry();
  } catch {
    return seedRegistry();
  }
}

function seedRegistry(): Record<string, StoredUserRecord> {
  const demo = createDemoUserRecord();
  const registry = { [demo.user.email.toLowerCase()]: demo };
  saveRegistry(registry);
  return registry;
}

function saveRegistry(registry: Record<string, StoredUserRecord>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
}

export function getUserByEmail(email: string): StoredUserRecord | null {
  const registry = loadRegistry();
  return registry[email.toLowerCase()] ?? null;
}

export function getUserById(userId: string): StoredUserRecord | null {
  const registry = loadRegistry();
  return (
    Object.values(registry).find((r) => r.user.id === userId) ?? null
  );
}

export function upsertUser(record: StoredUserRecord) {
  const registry = loadRegistry();
  registry[record.user.email.toLowerCase()] = record;
  saveRegistry(registry);
}

export function updateUserRecord(
  userId: string,
  updater: (record: StoredUserRecord) => StoredUserRecord
) {
  const registry = loadRegistry();
  const entry = Object.entries(registry).find(
    ([, r]) => r.user.id === userId
  );
  if (!entry) return;
  const [email, record] = entry;
  registry[email] = updater(record);
  saveRegistry(registry);
}
