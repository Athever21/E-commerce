import { createConnection } from "../../../clients/KnexClient";
import argon2 from "argon2";
import { ApolloError } from "apollo-server-express";

export default async (
  _: Object,
  { username, email, password }: UserInput,
  context: any
) => {
  let update: UserInput;
  if (username) update.username = username;
  if (email) update.email = email;
  if (password) update.password = await argon2.hash(password);

  if (!context.id) throw new ApolloError("Invalid token");
  const knex = createConnection();
  const res = await knex("users")
    .where("id", context.id)
    .update({ ...update });
  console.log(res);

  const user = await knex("users").select("id","username","email","img").where("id", context.id);
  return user[0];
};
