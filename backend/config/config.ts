import { configDotenv } from "dotenv";
import { mkdir } from "fs/promises";

/* Initialize ENV */
configDotenv();

/* Create uploads folder */
mkdir("uploads", { recursive: true }).then(() =>
  console.log("Folder uploads synced")
);
