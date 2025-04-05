import { Router } from "express";
import {
  addNewBoard,
  deleteBoard,
  getAllBoards,
  getBoardById,
} from "../controllers/boardsController";

const boardRouter = Router();

boardRouter.get("/all", getAllBoards);

boardRouter.get("/:id", getBoardById);

boardRouter.post("/add", addNewBoard);

boardRouter.delete("/delete/:id", deleteBoard);

export { boardRouter };
