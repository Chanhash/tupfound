import { Router } from "express";
import { z } from "zod";
import { supabaseAdmin } from "../lib/supabase.js";
import { parse } from "../lib/http.js";

const router = Router();

async function countItems(column: string, value: string): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from("items")
    .select("*", { count: "exact", head: true })
    .eq(column, value);
  if (error) throw error;
  return count ?? 0;
}

router.get("/stats", async (_req, res) => {
  const [reported, lost, found, matched, ready, retrieved] = await Promise.all([
    countItems("stage", "reported"),
    countItems("type", "lost"),
    countItems("type", "found"),
    countItems("stage", "matched"),
    countItems("stage", "ready"),
    countItems("stage", "retrieved")
  ]);

  res.json({ reported, lost, found, matched, ready, retrieved });
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
