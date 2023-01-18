module.exports = {
  client: {
    service: {
      name: "ticketApp",
      localSchemaFile: "./data/schema.graphql",
    },
    includes: ["./**/*.graphql"],
  },
};
