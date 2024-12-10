import express from "express";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { StatusCodes } from "http-status-codes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// app.get("/", (req: Request, res: Response) => {
//   console.log("server working");
//   res.status(200).json({ message: "working" });
// });

/** Page not found error middleware */
app.use("*", (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Page not found" });
});

interface AppError extends Error {
  status?: number;
}

/** Express error middleware */
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || StatusCodes.BAD_REQUEST;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT}`);
});
