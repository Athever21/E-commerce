import supertest from "supertest";
import { server } from "../src/index";
import { server as grpcServer } from "./helpers/grpc_test";
import { loginUser } from "./helpers/func";

const api = supertest(server);

it("Health check", async () => {
  const res = await api.get("/");
  expect(res.status).toBe(200);
  expect(res.body.status).toBe("healthy");
});

describe("Login User", () => {
  test("Correctly login user", async () => {
    const { res } = await loginUser(api, "test", "test");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("Missing arguments login user", async () => {
    const { res } = await loginUser(api, "test");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Missing username or password");

    const res1 = (await loginUser(api, "", "test")).res;
    expect(res1.status).toBe(400);
    expect(res1.body).toHaveProperty("error");
    expect(res1.body.error).toEqual("Missing username or password");
  });

  test("Invalid arguments login user", async () => {
    const { res } = await loginUser(api, "a", "b");
    expect(res.status).toBe(400);
    expect(res.body.error).toEqual("Invalid username or password");
  });
});

describe("Refresh Token", () => {
  test("Correctly refresh token", async () => {
    const { refToken } = await loginUser(api, "test", "test");
    const res = await api.post("/auth/refresh").set("Cookie", [refToken]);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
  test("Refresh token without cookie", async () => {
    const { refToken } = await loginUser(api, "test", "test");
    const res = await api.post("/auth/refresh");
    expect(res.status).toBe(401);
    expect(res.body.error).toEqual("Unauthorized");
  });
  test("Refresh token invalid cookie", async () => {
    const { refToken } = await loginUser(api, "test", "test");
    const res = await api
      .post("/auth/refresh")
      .set("Cookie", [refToken + "aaa"]);
    expect(res.status).toBe(403);
    expect(res.body.error).toEqual("Forbidden");
  });
});

describe("Loout", () => {
  test("Loging out with token", async() => {
    const res = await api.post("/auth/logout");
    const refToken = res.headers['set-cookie'][0].split(";")[0];
    expect(res.status).toBe(200);
    expect(refToken.split("=")[1]).toBe("");
    expect(res.text).toEqual("logged out");
  })
  test("Loging out without token", async() => {
    const res = await api.post("/auth/logout");
    const refToken = res.headers['set-cookie'][0].split(";")[0];
    expect(res.status).toBe(200);
    expect(refToken.split("=")[1]).toBe("");
    expect(res.text).toEqual("logged out");
  })
})

afterAll(() => {
  grpcServer.tryShutdown(() => {});
  server.close();
});
