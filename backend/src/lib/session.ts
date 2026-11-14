import type { CookieOptions, Response } from "express";
import type { Session } from "@supabase/supabase-js";
import { config } from "../config.js";

export const ACCESS_COOKIE = "sb-access";
export const REFRESH_COOKIE = "sb-refresh";

const base: CookieOptions = {
  httpOnly: true,
  secure: config.isProduction,
  sameSite: "lax",
  path: "/",
};

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export function setSessionCookies(res: Response, session: Session) {
  res.cookie(ACCESS_COOKIE, session.access_token, { ...base, maxAge: session.expires_in * 1000 });
  // Scoped to the API so it's only sent where it can actually be used.
  res.cookie(REFRESH_COOKIE, session.refresh_token, { ...base, path: "/api", maxAge: THIRTY_DAYS_MS });
}

export function clearSessionCookies(res: Response) {
  res.clearCookie(ACCESS_COOKIE, { ...base });
  res.clearCookie(REFRESH_COOKIE, { ...base, path: "/api" });
}
