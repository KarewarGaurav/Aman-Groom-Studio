/** Demo admin credentials — replace with server auth in production */
export const ADMIN_CREDENTIALS = {
  email: "admin@amangroomstudio.com",
  password: "AmanAdmin@2025",
} as const;

export const DEMO_ADMIN_USER = {
  id: "admin_001",
  name: "Priya Mehta",
  email: ADMIN_CREDENTIALS.email,
  role: "super_admin" as const,
  avatarInitials: "PM",
};
