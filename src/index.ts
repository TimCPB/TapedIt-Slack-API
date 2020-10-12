// import { ApolloServer } from "apollo-server";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolvers";
// import mongoose from "mongoose";

// const startServer = async () => {
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const slackQuery = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("request body is:");
  console.log(request.body);
  const user = request.body.user_id
  // const query = {
  //   query: "{ test }",
  //   variables: {},
  // };
  // request.body = query;
  response.send({
    // "channel": 'C017Q15T97T',
    // "response_type": "in_channel",
    // "text": "Hello TapedIt Team"
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey <@${user}>\n<https://tapedit.netlify.app/|Click *here* to tape your message>\n:loud_sound:`
        }
      }
    ]
  })
  // console.log(request.body);
  next();
};

app.use(slackQuery);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // playground: true,
});

server.applyMiddleware({ app, path: "/graphql" });

// await mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true})
// .then(()  => {
app.listen({ port: 4000 }, () => console.log(`🎙 Server ready at port 4000`));
// })
// .catch((err)=> { console.log(err)})
// };

// startServer();
