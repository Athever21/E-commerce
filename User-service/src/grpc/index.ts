import grpc from "grpc";
import { loadSync } from "@grpc/proto-loader";
import path from "path";
import {confirmLogin, checkLogin} from "./confirmLogin"

const protoPath = path.join(process.cwd(), "src", "grpc", "auth.proto");
const packageDef = loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const confirmProto = grpc.loadPackageDefinition(packageDef).Confirm as any;
const accessProto = grpc.loadPackageDefinition(packageDef).AccessToken as any;

export const client = new accessProto("localhost:3004",grpc.credentials.createInsecure());
export const main = () => {
  const server = new grpc.Server();
  server.addService(confirmProto.service, { confirmLogin, checkLogin });
  server.bindAsync(
    ":3005",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log("Server running at http://127.0.0.1:3005");
    }
  );
};
