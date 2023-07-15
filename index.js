import express from 'express';
import {graphqlHTTP} from 'express-graphql'
import schema from './schema.js';
import {books, authors} from './data.js';
import { GraphQLObjectType, GraphQLString } from 'graphql';

const app = express();

const root = {
  books: () => books,    // Add this resolver function to return all books
  book: ({ title }) => books.find(book => book.title === title),
  author: ({ name }) => authors.find(author => author.name === name),
  createBook: ({ title, publicationYear, author }) => {
    const book = { title, publicationYear, author };
    books.push(book);
    return book;
  },
  createAuthor: ({ name }) => {
    const author = { name, books: [] };
    authors.push(author);
    return author;
  }
};


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(3000, () => {
  console.log("server listing on port 3000");
});