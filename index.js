const { ApolloServer } = require("apollo-server");

const dotenv = require("dotenv");

dotenv.config();

const schema = require("./src/schema");
const resolvers = require("./src/resolvers");
const DataSources = require("./src/dataSources");
const { decodeToken } = require("./src/utils/token");

const knexConfig = {
  client: "mysql2",
  connection: {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
  },
};

const db = new DataSources(knexConfig);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => ({ db }),
  context: async ({ req }) => {
    const authUser = await decodeToken(req.headers.authorization);
    return {
      authUser,
    };
  },
});

const PORT = 4000;

server.listen(PORT).then(({ url }) => console.log(`🚀 Server ready at ${url}`));
