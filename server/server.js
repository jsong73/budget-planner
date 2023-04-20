const express = require("express");
const app = express();
const { ApolloServer } = require("apollo-server-express")
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});


const PORT = process.env.PORT || 3009;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });


  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);