import {createConnection} from "../../src/clients/KnexClient";

export default async() => {
  const knex = createConnection();
  await knex('user').truncate();
}