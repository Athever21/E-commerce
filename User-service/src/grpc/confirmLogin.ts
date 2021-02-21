import { createConnection } from "../clients/KnexClient";
import { CallOptions } from "grpc";
import argon2 from "argon2";

export const confirmLogin =  async (call: CallOptions, cb: Function): Promise<void> => {
  const knex = createConnection();
  const { login, password } = call.request;
  console.log(call.request);
  const res = await knex("users")
    .select("id","password","username","email")
    .where("username", login )
    .orWhere( "email", login );
  
  console.log(res);
  if (res.length === 0 || !(await argon2.verify(res[0].password, password))) {
    cb(null, { id: "", flag: false });
  }
  
  cb(null, { id: res[0].id, flag: true });
};

export const checkLogin = async(call: CallOptions, cb: Function): Promise<void> => {
  const knex = createConnection();
  const res = await knex("users")
    .select("id","username","email","img")
    .where("id", call.request.id);

  console.log(res[0]);

  cb(null, { u: {...res[0]} });
}
