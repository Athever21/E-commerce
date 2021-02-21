import rawSchema from "../../src/graphql/schema";
import rootResolver from "../../src/graphql/resolvers";
import { ApolloServer, gql, makeExecutableSchema } from "apollo-server-express";

export default (): ApolloServer => {
  const schema = makeExecutableSchema({
    typeDefs: gql(rawSchema),
    resolvers: rootResolver,
  });

  return new ApolloServer({ schema });
};
