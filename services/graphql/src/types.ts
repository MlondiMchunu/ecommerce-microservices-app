import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type User{
        id: ID!
        name: String!
        orders: [Order!]
        }

    type Order{
        id: ID!
        userId: ID!
        products: [Product!]
        total: Float!
        status: String!
        }

    type Prdoduct{
        id: ID!
        name: String!
        price: Float!
        description: String
        }

    type Query{
        user(id:ID!): User
        users: [User]
        order(id: ID!): Order
        orders:[Order]
        product(id: ID!):Product
        products: [Product]
        }

    type Mutation{
        createUser(name: String!, email: String): User
        updateUser(id: ID!, name: String, email: String): User
        deleteUser(id: ID!): Boolean

        createOrder(userId: ID!, productIds: [ID!]!): Order
        updateOrder(id: ID!, status: String!): Order
        deleteOrder(id: ID!): Boolean

        createProduct(name: String!, price: Float!, description: String): Product
        updateProduct(id: ID!, name: String, price: Float, description: String): Product
        deleteProduct(id: ID!): Boolean
        }
        `;
        
export { typeDefs };