import {
  ApolloServer,
  gql,
  makeExecutableSchema,
  ApolloError
} from "apollo-server-express";
import rawSchema from "./schema";
import rootResolver from "./resolvers";
import { Express } from "express";
import { client } from "../grpc/index";

const useApolloMiddleware = (app: Express): void => {
  const schema = makeExecutableSchema({
    typeDefs: gql(rawSchema),
    resolvers: rootResolver,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      if (token) {
        client.confirmToken({ token }, (err: Error, id: any) => {
          if (err) throw new ApolloError("Internal server error");
          if (id) {
            return {id};
          } else {
            throw new ApolloError("Invalid token")
          }
        });
      }

      return {id: null}
    },
  });

  const cors = {
    credentials: true,
    origin: process.env.CLIENT_URL,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-csrf-token",
      "x-utc-offset",
    ],
  };

  
  apolloServer.applyMiddleware({
    path: "/graphql",
    app,
    cors,
  });
};

export default useApolloMiddleware;
