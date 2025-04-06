import { Router } from "express";
import {
  endTimerForTask,
  getAllTimersForTask,
  startTimerForTaskId,
} from "../controllers/timerController";

const timerRouter = Router();

timerRouter.get("/task/:id", getAllTimersForTask);

timerRouter.post("/task/:id/start", startTimerForTaskId);

timerRouter.put("/task/end/:id", endTimerForTask);

export { timerRouter };
