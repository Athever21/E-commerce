import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./util/errorHandler";
import logger from "morgan";
import {grpcServer} from "./grpc";
require("dotenv").config();

import authRouter from "./routes/auth";

export const app = express();

const corsOpts = {
  origin: process.env.CLIENT_APP,
  credentials: true,
  methods: ["GET", "OPTIONS", "POST", "PUT", "HEAD"],
};

app.use(logger("dev"));
app.use(cors(corsOpts));
app.use(cookieParser());
app.use(express.json());

app.get(
  "/",
  (req: Request, res: Response): Response => {
    return res.json({
      api_name: process.env.SERVICE_NAME,
      status: "healthy",
    });
  }
);
app.use("/auth", authRouter);
app.use(errorHandler);

const port = process.env.PORT || 3002;
export const server = app.listen(port);
server.on("listening", () => console.log(`Server listening at port ${port}`));
grpcServer();