import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import Express from "express";
import "reflect-metadata";
import { buildSchema, formatArgumentValidationError } from "type-graphql";
import { createConnection } from "typeorm";
import { CreateExerciseResolver } from "./entity/exercise/resolvers/CreateExercise";
import { RegisterUserResolver } from "./entity/user/resolvers/RegisterUser";

const main = async () => {
  await createConnection({
    type: "postgres",
    url:
      process.env.DATABASE_URL ||
      "postgres://postgres:postgres@localhost/ideal-barnacle-test",
    entities: ["src/entity/**/*.ts"]
  })
    .then(connection => {
      console.log(connection);
    })
    .catch(error => console.log(error));

  const schema = await buildSchema({
    resolvers: [CreateExerciseResolver, RegisterUserResolver]
  });
  const server = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError
  });

  const app = Express();

  app.use(
    cors({
      credentials: true,
      origin:
        process.env.NODE_ENV === "production"
          ? "https://overload-client.herokuapp.com/"
          : "http://localhost:3000"
    })
  );

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(
      ` Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

main();
