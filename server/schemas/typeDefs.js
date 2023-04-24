const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    password: String
    expenses: [Expense]
    incomes: [Income]
  }
  
  type Expense {
    _id: ID
    title: String
    amount: String
    date: String
    category: String
    description: String
  }
  
  type Income {
    _id: ID
    title: String
    amount: String
    date: String
    description: String
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(email: String!): User
    expenses(email: String): [Expense]
    expense(expenseId: ID!): Expense
    incomes(email: String): [Income]
    income(incomeId: ID!): Income
    me: User
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addExpense(title: String!, amount: String!, date: String!, category: String!, description: String!): Expense
    addIncome(title: String!, amount: String!, date: String!, description: String!): Income
    removeExpense(expenseId: ID!): Expense
    removeIncome(incomeId: ID!): Income
  }
`;

module.exports = typeDefs;