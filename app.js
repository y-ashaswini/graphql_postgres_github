const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const { sequelize, books, authors } = require("./models");

// setting up middlewear
app.use(
  "/graphql",
  graphqlHTTP({
    // schema: schema,
    schema,
    graphiql: true,
  })
);

app.listen({ port: 5000 }, async () => {
  console.log("Postgres server up and running on port 5000");
  await sequelize.sync();
  console.log("Database connected!");
});

app.listen({ port: 4000 }, () => {
  console.log("Now listening for graphql requests on port 4000");
});
