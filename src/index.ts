// import { ApolloServer } from "apollo-server";
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from "./schema";
import resolvers from './resolvers';
import mongoose from 'mongoose';

const startServer = async() => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,

  });

  server.applyMiddleware({app});
  
  await mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()  => {
    app.listen({port: 4000}, () => 
    console.log(`🎙 Server ready at port 4000`)
  );
  })
  .catch((err)=> { console.log(err)})
}

startServer()
