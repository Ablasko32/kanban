import { Router } from "express";
import { getAllTasksForBoard } from "../controllers/tasksController";

const taskRouter = Router();

taskRouter.get("/all/:boardId", getAllTasksForBoard);

export { taskRouter };
