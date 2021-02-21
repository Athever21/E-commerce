import argon2 from "argon2";
import { createConnection } from "../../../clients/KnexClient";
import { ApolloError } from "apollo-server-express";
import validator from "validator";

export default async (
  _: Object,
  { user }: { user: UserInput }
): Promise<string> => {
  const { username, email } = user;
  const password = await argon2.hash(user.password);
  const knex = createConnection();

  if (!validator.isEmail(email)) {
    console.log("invalid email");
    throw new ApolloError("Email is not valid");
  }

  if (username.length > 16) {
    throw new ApolloError("Username too long");
  }

  try {
    const res = await knex("users").insert({ username, password, email });
    console.log(res);
  } catch (err) {
    console.log(err)
  }
  return "Succeed";
};
