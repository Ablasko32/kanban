import { Request, Response, NextFunction } from "express";
import { db } from "../config/db";
import { tasksTable, taskTimeTable } from "../db/schema";
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

    let timeQuery = db
      .select()
      .from(taskTimeTable)
      .leftJoin(tasksTable, eq(taskTimeTable.taskId, tasksTable.id))
      .$dynamic();

    if (board !== "all") {
      query = query.where(eq(tasksTable.boardId, Number(board)));
      timeQuery = timeQuery.where(eq(tasksTable.boardId, Number(board)));
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

    // TIME CALCULATIONS
    const timePerBoardRaw = await timeQuery.execute();

    const mergeTimePerBoard = timePerBoardRaw.map((el) => ({
      ...el.taskTime,
      ...el.tasks,
    }));

    // const uniqueTaskIds = new Set<number>();

    // const numberOfTasks = mergeTimePerBoard.forEach((el) => {
    //   uniqueTaskIds.add(el.taskId as number);
    // });

    // Total time
    const totalTime = mergeTimePerBoard
      .map((timeEntry) => timeInSeconds(timeEntry.startTime, timeEntry.endTime))
      .reduce((acc, current) => acc + current, 0);

    const averageTime = totalTime / taskData.length;

    // Final data format
    const dashboardData = {
      taskStatusData: {
        ...taskStatus,
        total: taskData.length,
      },
      taskTimeData: {
        average: averageTime,
        total: totalTime,
      },
    };

    return res.status(200).json({ data: dashboardData });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

type TaskStatus = "done" | "progress" | "open";

/* Helper for calculating time  in seconds */
const timeInSeconds = (
  startTime: string | Date,
  endTime: string | Date | null
) => {
  if (!startTime || !endTime) return 0;
  const startTimeDate = new Date(startTime).getTime();

  const endTimeDate = new Date(endTime).getTime();

  const seconds = (endTimeDate - startTimeDate) / 1000;
  return seconds;
};
