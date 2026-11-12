import { Request, Response, NextFunction } from 'express';
import { supabase } from './supabase.js';

export type Role = "user" | "admin";

declare global {
    namespace Express {
        interface Request {
            user?: { id: string, email?: string, role: Role };
        }
    }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['sb-access'];
    if (!token) return res.status(401).json({ error: 'Not authenticated!' });

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: 'Invalid session!' });

    const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    
    req.user = { id: user.id, email: user.email, role: profile?.role as Role || "user" };
    next();
}

export const requireRole = (...roles: Role[]) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated!' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden!' });
    next();
}