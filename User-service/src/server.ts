import app from "./app";
import http from "http";
import { createConnection } from "./clients/KnexClient";
import {main as grpc} from "./grpc";
require("dotenv").config();

const server = http.createServer(app);

const normalizePort = (val: string | number): number | string => {
  if (typeof val === "string") {
    const port = parseInt(val, 10);
    return port;
  } else if (val >= 0) {
    return val;
  }

  throw new Error("Failed to normalize port");
};

const onListening = (): void => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  console.log("Listening on " + bind);
};

const port = normalizePort("4000");
app.set("port", port);

const onError = (error: any) => {
  console.log(error);
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + "requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + "is already in use");
      process.exit(1);
    default:
      throw error;
  }
};

const knex = createConnection();
knex.raw("select 1+1 as result").catch((err) => console.log(err));

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
grpc();