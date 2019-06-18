import gql from 'graphql-tag';

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        name
        picture
        verified
      }
    }
  }
`;

export const REGISTER = gql`
  query Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        email
        name
        picture
        verified
      }
    }
  }
`;
