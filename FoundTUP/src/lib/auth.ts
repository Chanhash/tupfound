import type { Role } from "../types";

export const MIN_PASSWORD_LENGTH = 8;

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function homePathFor(role: Role): string {
  return role === "admin" ? "/admin" : "/home";
}
