import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middleware/errorHandler";
import { db } from "../config/db";
import { tasksTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const getAllTasksForBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { boardId } = req.params;
    if (!boardId) throw new ApiError("Params: boardId, is required.", 400);

    const data = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.boardId, Number(boardId)));

    return res.status(200).json({ data: data });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
