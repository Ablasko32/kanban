import { Request, Response, NextFunction } from "express";
import { db } from "../config/db";
import { tasksTable } from "../db/schema";

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskData = await db.select().from(tasksTable);

    let taskStatus = taskData.reduce(
      (total, task) => {
        const status = task.status;
        total[status] += 1;
        return total;
      },
      {
        open: 0,
        done: 0,
        progress: 0,
      }
    );

    // Final data format
    const dashboardData = {
      taskStatusData: {
        ...taskStatus,
        total: taskData.length,
      },
    };

    return res.status(200).json({ data: dashboardData });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
