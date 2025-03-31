import { Router } from "express";
import {
  addNewBoard,
  deleteBoard,
  getAllBoards,
} from "../controllers/boardsController";

const boardRouter = Router();

boardRouter.get("/all", getAllBoards);

boardRouter.post("/add", addNewBoard);

boardRouter.delete("/delete/:id", deleteBoard);

export { boardRouter };
