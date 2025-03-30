import express from "express";
import cors from "cors";
import { boardRouter } from "./routes/boardRouter";
import "./config/config";

const DEFAULT_PORT: number = 3000;

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Healthcheck OK" });
});

// ROUTES
app.use("/board", boardRouter);

app.listen(DEFAULT_PORT, () => {
  console.log("Server is running on port:" + DEFAULT_PORT);
});
