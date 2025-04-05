import { NextFunction, Request, Response } from "express";
import { db } from "../config/db";
import { boardsTable } from "../db/schema";
import { eq, InferSelectModel } from "drizzle-orm";
import { ApiError } from "../middleware/errorHandler";

/* Board model type */
type BoardType = InferSelectModel<typeof boardsTable>;

/* Return all boards array */
export const getAllBoards = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<{ data: BoardType[] }> | void> => {
  try {
    const boardsData = await db.select().from(boardsTable);
    return res.status(200).json({ data: boardsData });
  } catch (err) {
    next(err);
  }
};

// return board by board id
export const getBoardById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!id) throw new ApiError("Param: id, is required", 400);
    const data = await db
      .select()
      .from(boardsTable)
      .where(eq(boardsTable.id, Number(id)));

    return res.status(200).json({ data: data });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const addNewBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<{ data: BoardType[] }> | void> => {
  const { name } = req.body;

  try {
    if (!name) {
      throw new ApiError("Body data: name ,must be provided", 400);
    }
    const createdBoard = await db
      .insert(boardsTable)
      .values({ boardName: name })
      .returning();
    return res.status(201).json({ data: createdBoard });
  } catch (err) {
    next(err);
  }
};

export const deleteBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<{ message: string }> | void> => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new ApiError("Parametar: id ,must be provided", 400);
    }
    await db.delete(boardsTable).where(eq(boardsTable.id, Number(id)));
    return res.status(200).json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
