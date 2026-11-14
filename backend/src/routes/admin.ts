import { Router } from "express";
import { z } from "zod";
import { supabaseAdmin } from "../lib/supabase.js";
import { parse } from "../lib/http.js";

const router = Router();

router.get("/stats", async (_req, res) => {
  const { count: lost, error } = await supabaseAdmin
    .from("items")
    .select("*", { count: "exact", head: true })
    .eq("type", "lost");
  if (error) throw error;

  res.json({ lost: lost ?? 0 });
});

const itemsQuery = z.object({
  type: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
});

router.get("/items", async (req, res) => {
  const { type, page, pageSize } = parse(itemsQuery, req.query);
  const from = (page - 1) * pageSize;

  let query = supabaseAdmin.from("items").select("*", { count: "exact" }).range(from, from + pageSize - 1);
  if (type) query = query.eq("type", type);

  const { data, count, error } = await query;
  if (error) throw error;

  res.json({ items: data, total: count ?? 0, page, pageSize });
});

export default router;
