export type Role = "user" | "admin";

export type User = { id: string; email: string; role: Role };

export type AdminStats = { 
    reported: number, 
    lost: number, 
    found: number, 
    matched: number, 
    ready: number, 
    retrieved: number 
};
