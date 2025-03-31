import { NextFunction, Request, Response, ErrorRequestHandler } from "express";

// Custom class ,accepts message and status code of error
export class ApiError extends Error {
  constructor(public message: string, public status: number) {
    super(message);

    Error.captureStackTrace(this, ApiError);
  }
}

export const errorMiddleware = (
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isApiError = err instanceof ApiError;
  console.error(err);

  const message = err.message || "Internal server error";
  const statusCode = isApiError ? (err as ApiError).status : 500;

  return res.status(statusCode).json({ error: message });
};
