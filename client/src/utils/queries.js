import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
      password
      incomes {
        _id
        amount
        date
        description
        title
      }
      expenses {
        _id
        amount
        category
        date
        description
        title
      }
    }
  }
`;