import { createConnection } from "../../../clients/KnexClient";
import { ApolloError } from "apollo-server-express";

export default async (
  _: Object,
  { page }: { page: number}
) => {
  const p = page ? page : 0;
  const perPage = 20;
  const knex = createConnection();
  const res = await knex("users")
    .select("id", "username", "email", "img")
    .offset(p*perPage)
    .limit(perPage);

  if (res.length === 0) {
    throw new ApolloError("User not found");
  }

  return res;
};
