const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;
// lodash : used for searching inside objects and arrays, instead of having to write the entire logic by ourselves
const _ = require("lodash");
const { books, authors } = require("../models");

// dummy data
// var books_dummy_data = [
//   // authorId : the foreign key to the author's data!
//   { id: "1", name: "Book 1", genre: "Genre 1", authorId: "1" },
//   { id: "2", name: "Book 2", genre: "Genre 2", authorId: "2" },
//   { id: "3", name: "Book 3", genre: "Genre 3", authorId: "3" },
//   { id: "4", name: "Book 4", genre: "Genre 2", authorId: "1" },
// ];
// var auth_dummy_data = [
//   { id: "1", name: "Author 1", age: 30 },
//   { id: "2", name: "Author 2", age: 20 },
//   { id: "3", name: "Author 3", age: 60 },
// ];

const BookType = new GraphQLObjectType({
  name: "Book",

  // WHY are these functions?
  // Well the thing is, in each of these types, we reference some other type
  // Code is read from top to bottom, so if you simply define it as a NON-function, it'll
  // execute that bit of code right then, and come back with an error saying the one defined later
  // downwards is not defined! SO to get rid of this, we make the fields property an ARROW function
  // which means it'll simply be defined there, and run ONLY when it is called!
  // geddit?

  fields: () => ({
    id: {
      //   type: GraphQLString,
      type: GraphQLID,
    },
    authorId: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    genre: {
      type: GraphQLString,
    },
    author_of_book: {
      type: AuthorType,
      async resolve(parent, args) {
        // return _.find(auth_dummy_data, { id: parent.authorId });
        // console.log(parent.authorId);
        const getauthor = await authors.findAll({
          where: { id: parent.authorId },
        });
        return getauthor[0];
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {
      //   type: GraphQLString,
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    books_by_author: {
      type: new GraphQLList(BookType), // its a list of books! not an individual book!
      async resolve(parent, args) {
        // return _.filter(books_dummy_data, { authorId: parent.id });
        console.log("Parent id: ", parent.id);
        const getbooks = await books.findAll({
          where: { authorId: parent.id },
        });
        // console.log("RETURN QUERY:", getbooks);
        // console.log("-------------------------------------------------");
        return getbooks;
      },
    },
  }),
});

// Root queries : entry points, points to enter the graph from
// This is like those routes that you set up, for all books, one particular book, etc.

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // this name matters. becasue on the frontend, you use it like
    // book {
    //     name
    //     genre
    // }
    // etc.

    book: {
      type: BookType,
      // used on the frontend like
      // book(id: "123") {
      //     name
      //     genre
      // }
      // etc.
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        // return _.find(auth_dummy_data, { id: args.id });
        const get_book_of_this_id = await books.findAll({
          where: { id: args.id },
        });
        return get_book_of_this_id[0];
      },
    },

    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        // code to get data from db/ other source
        // parent : used when we define relations
        // args : the args passed in each query
        // return _.find(books_dummy_data, { id: args.id });
        const get_author_of_this_id = await authors.findAll({
          where: { id: args.id },
        });
        return get_author_of_this_id[0];
      },
    },

    // all books
    booksall: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        // return books_dummy_data;
        const getallbooks = await books.findAll();
        return getallbooks;
      },
    },
    // all authors
    authorsall: {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args) {
        // return auth_dummy_data;
        const getallauths = await authors.findAll();
        return getallauths;
      },
    },
  },
});

// Setting up what data can be changed / not, etc.
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author_new = authors.create({ name: args.name, age: args.age });
        return author_new;
      },
    },

    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },

      resolve(parent, args) {
        let book_new = books.create({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book_new;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
