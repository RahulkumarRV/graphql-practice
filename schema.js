import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Book {
        title: String
        publicationYear: Int
        author: Author
    }

    type Author {
        name: String
        books: [Book]
    }

    type Query {
        book(title: String): Book
        author(name: String): Author
    }

    type Mutation {
        createBook(title: String!, publicationYear: Int!, author: String!): Book
        createAuthor(name: String!): Author
    }
`);

export default schema;