import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from './types';


const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () =>
        console.log(`Server ready at http://localhost:4000 ${server.graphqlPath}`)
    );
});