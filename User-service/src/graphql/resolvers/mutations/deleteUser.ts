import {createConnection} from "../../../clients/KnexClient";

export default async(_: Object,__: Object, context: any) => {
  if(context.id) {
    const knex = createConnection();
    await knex("users").where("id", context.id).delete();
  }

  return "deleted";
}