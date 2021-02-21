import grpc, { CallOptions } from "grpc";
import { loadSync } from "@grpc/proto-loader";
import path from "path";
import jwt from "jsonwebtoken";

const prtotoPath = path.join(process.cwd(), "src", "grpc", "auth.proto");

const packageDef = loadSync(prtotoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const confirmProto = grpc.loadPackageDefinition(packageDef).Confirm as any;
const accessProto = grpc.loadPackageDefinition(packageDef).AccessToken as any;

const confirmToken = (call: CallOptions, cb: Function) => {
  const { token } = call.request;

  try {
    const id = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    cb(null, { id });
  } catch {
    cb(null, { id: "" });
  }
};

export const client = new confirmProto(
  ":3005",
  grpc.credentials.createInsecure()
);
export const grpcServer = () => {
  const server = new grpc.Server();
  server.addService(accessProto.service, { confirmToken });
  try {
    server.bindAsync(":3004", grpc.ServerCredentials.createInsecure(), () => {
      server.start();
      console.log("Server running at http://127.0.0.1:3004");
    });
  } catch (err) {
    console.log(err);
  }

  // process.on("beforeExit", () => server.tryShutdown(() => console.log("Grpc server closed")));
};
