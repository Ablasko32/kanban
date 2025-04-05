import { Router } from "express";
import {
  addNewTask,
  getAllTasksForBoard,
  getTaskById,
  updateTask,
} from "../controllers/tasksController";

const taskRouter = Router();

taskRouter.get("/all/:boardId", getAllTasksForBoard);

taskRouter.get("/:id", getTaskById);

taskRouter.post("/add", addNewTask);

taskRouter.put("/update/:id", updateTask);

export { taskRouter };
