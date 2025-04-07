import { Request, Response, NextFunction } from "express";
import { db } from "../config/db";
import { tasksTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { board } = req.query;
    console.log(board);

    let query = db.select().from(tasksTable).$dynamic();

    if (board !== "all") {
      query = query.where(eq(tasksTable.boardId, Number(board)));
    }

    const taskData = await query.execute();

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
