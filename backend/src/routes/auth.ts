import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { z } from "zod";
import { createAuthClient, supabaseAdmin } from "../lib/supabase.js";
import { ACCESS_COOKIE, clearSessionCookies, setSessionCookies } from "../lib/session.js";
import { getRole, requireAuth, type AuthUser } from "../lib/middleware.js";
import { HttpError, parse } from "../lib/http.js";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many attempts. Please try again in a few minutes." },
});

const email = z.email("Please enter a valid email address.").trim().toLowerCase();

const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required."),
});

const registerSchema = z.object({
  email,
  password: z.string().min(8, "Password must be at least 8 characters."),
});

router.post("/register", authLimiter, async (req, res) => {
  const body = parse(registerSchema, req.body);

  const { data, error } = await createAuthClient().auth.signUp(body);
  if (error) throw new HttpError(400, error.message);

  if (data.session && data.user) {
    setSessionCookies(res, data.session);
    const user: AuthUser = { id: data.user.id, email: data.user.email ?? "", role: await getRole(data.user.id) };
    res.status(201).json({ user, confirmEmail: false });
    return;
  }

  res.status(201).json({ user: null, confirmEmail: true });
});

router.post("/login", authLimiter, async (req, res) => {
  const body = parse(loginSchema, req.body);

  const { data, error } = await createAuthClient().auth.signInWithPassword(body);
  if (error) {
    if (error.code === "email_not_confirmed") throw new HttpError(403, "Please confirm your email before logging in.");
    if (error.status === 400) throw new HttpError(401, "Invalid email or password.");
    throw new HttpError(502, "Unable to log in right now.");
  }

  setSessionCookies(res, data.session);
  const user: AuthUser = { id: data.user.id, email: data.user.email ?? "", role: await getRole(data.user.id) };
  res.json({ user });
});

router.post("/logout", async (req, res) => {
  const accessToken: string | undefined = req.cookies[ACCESS_COOKIE];
  if (accessToken) {
    await supabaseAdmin.auth.admin.signOut(accessToken).catch(() => {});
  }
  clearSessionCookies(res);
  res.status(204).end();
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
