const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: String!
    friends: [User]
    faviouratemovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublish: Int!
    isInTheater: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie]!
    movie(name: String!): Movie
  }

  input createUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: String
  }

  input updateUserInput {
    id: ID!
    newusername: String!
  }

  input deleteUserInput {
    id: ID!
  }

  type Mutation {
    CreateUser(input: createUserInput!): User
    UpdateUser(input: updateUserInput!): User
    DeleteUser(input: deleteUserInput!): User
  }

  # enum Nationality {
  #   india
  #   norway
  #   ecuador
  #   sweden
  #   china
  #   bulgaria
  # }
`;

module.exports = { typeDefs };
