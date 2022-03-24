const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-def");
const { resolvers } = require("./schema/resolver");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  //context provide the qucik acces like req varriable,data,etc in resolver directlly
  context: ({ req }) => {
    return { req, name: "darshit vaghasiya" };
  },
});

server.listen().then(({ url }) => {
  console.log(`YOUR API IS RUNNING AT ${url}`);
});
