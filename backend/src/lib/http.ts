import type { ErrorRequestHandler, RequestHandler } from "express";
import { z } from "zod";

/** Throw from any route/middleware to send a specific status + message to the client. */
export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** Validate untrusted input. Throws a 400 with the first problem found. */
export function parse<T extends z.ZodType>(schema: T, data: unknown): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) throw new HttpError(400, result.error.issues[0]?.message ?? "Invalid request.");
  return result.data;
}

export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "Not found." });
};

// Express 5 forwards rejected promises from async handlers here automatically.
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }
  // Malformed JSON body from express.json()
  if (err?.type === "entity.parse.failed") {
    res.status(400).json({ error: "Malformed JSON body." });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error." });
};
