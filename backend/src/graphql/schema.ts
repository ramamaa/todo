import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Task {
    id: ID!
    name: String!
    isCompleted: Boolean!
  }
  type Query {
    tasks: [Task!]!
  }
  type Mutation {
    addTask(name: String!): Task!
    delete(id: ID!): Boolean!
    toggleTask(id: ID!): Task!
  }
`;
