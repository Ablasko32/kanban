import { Request, Response, NextFunction } from "express";
import { ApiError } from "../middleware/errorHandler";
import { db } from "../config/db";
import { taskTimeTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const getAllTimersForTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: taskId } = req.params;
    if (!taskId) throw new ApiError("Parameter: id, is required", 400);

    const data = await db.select().from(taskTimeTable);
    return res.status(200).json({ data: data });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const startTimerForTaskId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: taskId } = req.params;
    if (!taskId) throw new ApiError("Parameter: id, is required", 400);

    const values = {
      startTime: new Date(),
      taskId: Number(taskId),
    };

    const data = await db.insert(taskTimeTable).values(values).returning();
    return res.status(200).json({ data: data });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const endTimerForTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: timerId } = req.params;
    if (!timerId) throw new ApiError("Parameter: id, is required", 400);

    const values = {
      endTime: new Date(),
    };

    const data = await db
      .update(taskTimeTable)
      .set(values)
      .where(eq(taskTimeTable.id, Number(timerId)))
      .returning();
    return res.status(200).json({ data: data });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
