const { ApolloServer, gql } = require("apollo-server")
const { User, Todo } = require('./db')

var typeDefs = gql`
    type Todo{
        title : String!
    }
    type User{
        name: String!
        todos:[Todo]
    }
    type Query{
        user(name:String!): User
        users:[User]
    }
    input TodoInput{
        title: String!
    }
    type Mutation{
        addUser(name:String!):User
        addTodo(todo:TodoInput!,userName:String!):Boolean
    }
    type Schema{
        query:Query
    }
`

var resolvers = {
    Query: {
        user(parents, args, context, info) {
            return new Promise((res, rej) => {
                User.findOne({ name: args.name }, (err, user) => {
                    if (err) rej(err)
                    console.log(user)
                    res(user)
                })
            })
        },
        users(parents, args, ctx, info) {
            return new Promise((res, rej) => {
                User.find((err, users) => {
                    if (err) rej(err)
                    console.log(users)
                    res(users)
                })
            })
        }
    },
    Mutation: {
        addUser(parent, args, context, info) {
            return new Promise((res, rej) => {
                User.create({ name: args.name }, (err, user) => {
                    if (err) rej(err)
                    console.log(user)
                    res(user)
                })
            })
        },
        addTodo(parent, args, context, info) {
            return new Promise((res, rej) => {
                User.updateOne({ name: args.userName }, { "$push": { todos: args.todo } }, (err) => {
                    if (err) rej(err)
                    res(true)
                })
            })
        }
    }
}
var server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log("Server started at " + url)
})