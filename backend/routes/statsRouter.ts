import { Router } from "express";
import { getDashboardStats } from "../controllers/statsController";

const statsRouter = Router();

statsRouter.get("/dashboard", getDashboardStats);

export { statsRouter };
