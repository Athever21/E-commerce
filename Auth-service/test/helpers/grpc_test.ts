import grpc, { CallOptions } from "grpc";
import { loadSync } from "@grpc/proto-loader";
import path from "path";

const protoPath = path.join(process.cwd(), "src", "grpc", "auth.proto");
const packageDef = loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const confirmProto = grpc.loadPackageDefinition(packageDef).Confirm as any;

const confirmLogin = (call: CallOptions, cb: Function) => {
  const { username, password } = call.request;
  if (username === "test" && password === "test") {
    cb(null, { id: "id", flag: true });
  } else {
    cb(null, { id: "", flag: false });
  }
};

export const server = new grpc.Server();
server.addService(confirmProto.service, { confirmLogin });
server.bindAsync(
  "localhost:30043",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Server running at http://127.0.0.1:95321");
    server.start();
  }
);