import "dotenv/config";
import express from "express";
import cors from "cors";
import { supabase } from "./lib/supabase.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}));

app.get("/api/items", async (req, res) => {
  const { data, error } = await supabase
    .from("items")
    .select("*");

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});