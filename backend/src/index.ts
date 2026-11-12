import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import { requireAuth, requireRole } from "./lib/middleware.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth", authRouter);

app.get("/api/auth/me", requireAuth, (req, res) => {res.json({ user: req.user })});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});