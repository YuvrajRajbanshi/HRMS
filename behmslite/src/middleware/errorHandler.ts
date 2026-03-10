import { Request, Response, NextFunction } from "express";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const errorHandler = (
  err: ErrorWithStatus,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error("Error:", err.message);

  const status = err.status || 500;
  const message = status === 500 ? "Internal Server Error" : err.message;

  res.status(status).json({ message });
};
