const fs = require("fs");
const path = require("path");
const { ApolloServer } = require("apollo-server");
const Fuse = require("fuse.js");

const resolvers = require("./resolvers");
const books = require("./books.json");

const filePath = path.join(__dirname, "typedefs.graphql");
const typeDefs = fs.readFileSync(filePath, "utf-8");

const fuseOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    {
      name: "title",
      weight: 0.5
    },
    {
      name: "author",
      weight: 0.3
    },
    {
      name: "publisher",
      weight: 0.1
    },
    {
      name: "synopsis",
      weight: 0.1
    }
  ],
  id: "id"
};

const fuse = new Fuse(books, fuseOptions);
const booksMap = books.reduce(
  (acc, current) => ({ ...acc, [current.id]: current }),
  {}
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {
    return {
      fuse,
      books,
      booksMap
    };
  },
  formatError: error => {
    //console.log(error);
    return error;
    // Or, you can delete the exception information
    // delete error.extensions.exception;
    // return error;
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
