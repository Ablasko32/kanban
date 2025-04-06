import { Router } from "express";
import {
  addNewTask,
  deleteTaskByID,
  deleteTaskFileById,
  getAllTasksForBoard,
  getTaskById,
  getUploadedFilesForTask,
  updateTask,
  uploadFileForTask,
} from "../controllers/tasksController";
import { upload } from "../config/multer";

const taskRouter = Router();

taskRouter.get("/all/:boardId", getAllTasksForBoard);

taskRouter.get("/:id", getTaskById);

taskRouter.post("/add", addNewTask);

taskRouter.put("/update/:id", updateTask);

taskRouter.delete("/delete/:id", deleteTaskByID);

// task file upload
taskRouter.post("/upload-file", upload.single("file"), uploadFileForTask);

taskRouter.get("/upload-file/:id", getUploadedFilesForTask);

taskRouter.delete("/upload-file/:id", deleteTaskFileById);

export { taskRouter };
