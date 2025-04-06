import express from "express";
import cors from "cors";
import { boardRouter } from "./routes/boardRouter";
import "./config/config";
import "./config/db";
import { errorMiddleware } from "./middleware/errorHandler";
import { taskRouter } from "./routes/taskRouter";
import multer from "multer";
import path from "path";
import { timerRouter } from "./routes/timerRouter";

const DEFAULT_PORT: number = 3000;

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// SERVE STATIC FILES
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
console.log("Serving static files from:", path.join(__dirname, "/uploads"));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Healthcheck OK" });
});

// ROUTES
app.use("/boards", boardRouter);
app.use("/tasks", taskRouter);
app.use("/timer", timerRouter);

// Error middleware
app.use(errorMiddleware);

app.listen(DEFAULT_PORT, () => {
  console.log("Server is running on port:" + DEFAULT_PORT);
});
