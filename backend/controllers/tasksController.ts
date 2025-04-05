import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middleware/errorHandler";
import { db } from "../config/db";
import { boardsTable, tasksTable } from "../db/schema";
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

export const addNewTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  try {
    if (!body) throw new ApiError("Body must be provided.", 400);
    body.dueDate = new Date(body.dueDate);

    const data = await db.insert(tasksTable).values(body).returning();
    return res.status(201).json({ data: data });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const body = req.body;

  try {
    if (!id || !body)
      throw new ApiError("Parametar: id, and body content are required", 400);
    const data = await db
      .update(tasksTable)
      .set(body)
      .where(eq(tasksTable.id, Number(id)))
      .returning();

    return res.status(201).json({ data: data });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!id) throw new ApiError("Parametar: id  is required", 400);
    const data = await db
      .select()
      .from(tasksTable)
      .leftJoin(boardsTable, eq(tasksTable.boardId, boardsTable.id))
      .where(eq(tasksTable.id, Number(id)));

    const flattenedData = data.map((el) => ({ ...el.tasks, ...el.boards }));

    return res.status(201).json({ data: flattenedData });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deleteTaskByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const data = await db
      .delete(tasksTable)
      .where(eq(tasksTable.id, Number(id)))
      .returning();
    res.status(200).json({ data: data });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// File upload
export const uploadFileForTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send(`File ${req.file?.originalname} uploaded successfully!`);
};
