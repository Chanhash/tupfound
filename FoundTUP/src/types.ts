export type Role = "user" | "admin";

export type User = { id: string; email: string; role: Role };

export type AdminStats = { lost: number };
