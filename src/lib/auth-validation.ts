export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password)) return "Include at least one uppercase letter";
  if (!/[0-9]/.test(password)) return "Include at least one number";
  return null;
}

export function validateOtp(code: string): boolean {
  return /^\d{6}$/.test(code.trim());
}

export function validatePhone(phone: string): boolean {
  return /^[+]?[\d\s-]{10,15}$/.test(phone.trim());
}
