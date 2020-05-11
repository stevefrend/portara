const { ApolloServer, gql } = require('apollo-server');
import { portaraSchemaDirective } from './rateLimiter';

// typeDefs
const typeDefs = gql`
  directive @portara(limit: Int!, per: ID!) on FIELD_DEFINITION | OBJECT 

  type Query {
    test: String!
  }
  type Mutation @portara(limit: 2, per: "100") {
    hello: String! @portara(limit: 2, per: "100")
    bye: String! 
  }
`;

// Resolvers
export const resolvers = {
  Query: {
    test: (parent, args, context, info) => {
      return 'Test'
    }
  },
  Mutation: {
    hello: (parent, args, context, info) => {
      // console.log(info)
      return 'Request completed and returned';
    },
    bye: (parent, args, context, info) => {
      return 'Goodbye world';
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
  schemaDirectives: {
    portara: portaraSchemaDirective,
  },
});

server.listen({ port: 4000 }, () => {
  console.log(`Server running @ PORT 4000`);
});
