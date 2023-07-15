import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

const User = [
  {id: 0, fullname: 'John', username: 'John', city: 'San Francisco', phone_number: '123'},
  {id: 1, fullname: 'John1', username: 'John1', city: 'San Francisco', phone_number: '1323'},
  {id: 2, fullname: 'John2', username: 'John2', city: 'San Francisco', phone_number: '144523'},
  {id: 3, fullname: 'John3', username: 'John3', city: 'San Francisco', phone_number: '145623'},
]


const typeDefs = `type Query {
  getUser(id: ID!): User
  getUsers: [User]
}
type User {
  id: ID!
  fullname: String!
  username: String!
  phone_number: String!
  city: String!
}
type Mutation {
  addUser(fullname: String!, username: String!, city: String!, phone_number: String!): User!
  deleteUser(id: ID!): String
}
`;


const resolvers = {
  Query: {
    getUsers: () => User,
    getUser: (_, {id}) => {
      return User.find(user => user.id === Number(id));
    }
  },
  Mutation: {
    addUser: (_, {fullname, username, phone_number, city}) => {
      User.push({id: User.length, fullname, username, phone_number, city});
      return {id: User.length-1,fullname, username, phone_number, city};
    },
    deleteUser: (_, {id}) => {
      User.filter((user) => user.id !== id);
      return "User deleted";
    }
  }
}

export const schema = createSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})


const yoga = createYoga({ schema })
 
// Pass it into a server to hook into request handlers.
const server = createServer(yoga)
 
// Start the server and you're done!
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
