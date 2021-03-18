const { gql } = require("apollo-server");

const schema = gql`
  type Query {
    getAllTodos(page: Int): Todos
  }

  type Mutation {
    registerUser(user: UserInput!): Profile
    loginUser(user: UserInput!): Profile

    addTodo(todo: TodoInput!): Todo
    updateTodo(id: ID!, todo: TodoInput!): Todo
    deleteTodo(id: ID!): ID!
    deleteCompletedTodo: Boolean
  }

  input UserInput {
    fullname: String
    bio: String
    email: String!
    password: String!
  }

  input TodoInput {
    text: String!
    isCompleted: Boolean!
  }

  type Todo {
    id: ID!
    text: String!
    isCompleted: Boolean
    author: Profile
    createdAt: String
  }

  type Todos {
    todos: [Todo]
    total: Int
  }

  type Profile {
    id: ID!
    fullname: String!
    email: String!
    token: String
    bio: String
  }
`;

module.exports = schema;
