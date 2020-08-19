// import { ApolloServer } from "apollo-server";
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from "./schema";
import resolvers from './resolvers';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({app});

console.log(app)

app.listen({port: 4000}, () => 
  console.log(`🎙 Server ready at port 4000`)
);




// server.listen().then(({ url }) => {
//   console.log(`🎙 Server ready at ${url}`);
// });