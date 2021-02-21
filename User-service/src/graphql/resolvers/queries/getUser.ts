import { createConnection } from "../../../clients/KnexClient";
import { ApolloError } from "apollo-server-express";

export default async (
  _: Object,
  { id, username }: { id: string; username: string }
): Promise<User> => {
  const knex = createConnection();
  const res = await knex("users")
    .select("id", "username", "email", "img")
    .where({ id: id ? id : "" })
    .orWhere({ username: username ? username : "" });

  if (res.length === 0) {
    throw new ApolloError("User not found");
  }

  return res[0];
};
