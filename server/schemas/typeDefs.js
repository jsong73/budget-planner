const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    password: String
    expenses: [Expense]!
    income: [Income]!
  }
  
  type Expense {
    _id: ID
    title: String
    amount: Float
    date: String
    category: String
    description: String
    user: User
  }
  
  type Income {
    _id: ID
    title: String
    amount: Float
    date: String
    category: String
    description: String
    user: User
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    expenses(username: String): [Expense]
    expense(expenseId: ID!): Expense
    incomes(username: String): [Income]
    income(incomeId: ID!): Income
    me: User
  }
  
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addExpense(title: String!, amount: Float!, date: String!, category: String!, description: String!): Expense
    addIncome(title: String!, amount: Float!, date: String!, category: String!, description: String!): Income
    removeExpense(expenseId: ID!): Expense
    removeIncome(incomeId: ID!): Income
  }
`;

module.exports = typeDefs;