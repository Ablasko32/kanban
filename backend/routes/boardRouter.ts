import { Router } from "express";

const boardRouter = Router();

boardRouter.get("/all", (req, res) => {
  return res.status(200).json({ data: "All boards" });
});

boardRouter.post("/add", (req, res) => {
  return res.status(201).json({ data: "Board added" });
});

boardRouter.delete("/delete/:id", (req, res) => {
  return res.status(201).json({ data: "Board deleted" });
});

export { boardRouter };
