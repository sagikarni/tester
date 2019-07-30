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

export const RECOVER_ACCOUNT = gql`
  query RecoverAccount($email: String!) {
    recoverAccount(email: $email) {
      result
    }
  }
`;

export const VERIFY_ACCOUNT = gql`
  query {
    verifyAccount {
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

export const CHANGE_PASSWORD = gql`
  query ChangePassword($password: String!) {
    changePassword(password: $password) {
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

export const NEW_PURCHASE = gql`
  query newPurchase($plan: String!) {
    newPurchase(plan: $plan) {
      token
    }
  }
`;
