import type { NextFunction, Request, Response } from "express";
import { createAuthClient, supabaseAdmin } from "./supabase.js";
import { ACCESS_COOKIE, REFRESH_COOKIE, clearSessionCookies, setSessionCookies } from "./session.js";

export type Role = "user" | "admin";
export type AuthUser = { id: string; email: string; role: Role };

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export async function getRole(userId: string): Promise<Role> {
  const { data, error } = await supabaseAdmin.from("profiles").select("role").eq("id", userId).maybeSingle();
  if (error) throw error;
  return data?.role === "admin" ? "admin" : "user";
}

async function resolveUser(req: Request, res: Response): Promise<AuthUser | null> {
  const accessToken: string | undefined = req.cookies[ACCESS_COOKIE];
  if (accessToken) {
    const { data, error } = await supabaseAdmin.auth.getClaims(accessToken);
    if (!error && data) {
      const { sub, email } = data.claims;
      return { id: sub, email: email ?? "", role: await getRole(sub) };
    }
  }

  const refreshToken: string | undefined = req.cookies[REFRESH_COOKIE];
  if (!refreshToken) return null;

  const { data, error } = await createAuthClient().auth.refreshSession({ refresh_token: refreshToken });
  if (error || !data.session || !data.user) return null;

  setSessionCookies(res, data.session);
  return { id: data.user.id, email: data.user.email ?? "", role: await getRole(data.user.id) };
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const user = await resolveUser(req, res);
  if (!user) {
    clearSessionCookies(res);
    res.status(401).json({ error: "Not authenticated." });
    return;
  }
  req.user = user;
  next();
}

export const requireRole =
  (...roles: Role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated." });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: "Forbidden." });
      return;
    }
    next();
  };
