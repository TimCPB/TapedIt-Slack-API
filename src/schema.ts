import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    notes: [Note]
    users: [User]
    test: String
  }

  type Note {
    id: ID!
    sender: String!
    receiver: String!
    status: String!
    url: String!
  }

  type User {
    id: ID!
    slackID: String
    senderNotes: [ID]
    receiverNotes: [ID]
  }

  type Mutation {
    createNote(
      sender: String!
      receiver: String!
      status: String!
      url: String!
    ): Note!
    createUser(slackID: String!): User!
  }
`;

export default typeDefs;
