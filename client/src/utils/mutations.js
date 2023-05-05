import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user{
                _id
                email
                password
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($email: String!, $password: String!){
        addUser(email: $email, password: $password) {
            token
            user {
                _id
                email
                password
            }
        }
    }
`;

export const ADD_INCOME = gql`
    mutation addIncome($title: String!, $amount: String!, $date: String!, $description: String){
        addIncome(title: $title, amount: $amount, date: $date, description: $description) {
            _id
            amount
            date
            description
            title
        }
    }
`;

export const ADD_EXPENSE = gql`
    mutation addExpense($title: String!, $amount: String!, $date: String!, $category: String!, $description: String!) {
    addExpense(title: $title, amount: $amount, date: $date, category: $category, description: $description) {
      _id
      amount
      category
      date
      description
      title
    }
  }
  `;
