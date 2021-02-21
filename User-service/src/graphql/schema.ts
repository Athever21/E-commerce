export default `
  input UserInput {
    username: String!,
    email: String!,
    password: String!,
  }

  input ChangeUser {
    username: String,
    email: String,
    password: String,
  }

  type User {
    id: String!
    username: String!,
    email: String!,
    img: String
  }

  type Query {
    getUser(id: String,username: String): User!
    getUsers(page: Int) : [User]!
  }

  type Mutation {
    createUser(user: UserInput!): String! 
    changeUser(user: ChangeUser!): User!
    deleteUser: String!
  }
`;
