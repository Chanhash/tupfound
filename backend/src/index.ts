import { config } from "./config.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import { requireAuth, requireRole } from "./lib/middleware.js";
import { errorHandler, notFound } from "./lib/http.js";

const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

app.use(cors({ origin: config.clientOrigin, credentials: true }));

app.use("/api/auth", authRouter);
app.use("/api/admin", requireAuth, requireRole("admin"), adminRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
