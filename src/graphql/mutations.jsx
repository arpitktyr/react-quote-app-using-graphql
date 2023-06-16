import { gql } from "@apollo/client";
export const SIGNUP_USER = gql`
  mutation createUser($userNew: UserInput!) {
    user: signupUser(userNew: $userNew) {
      firstName
    }
  }
`;
export const LOGIN_USER = gql`
  mutation SigninUser($userSignIn: UserSigninInput!) {
    user: signinUser(userSignin: $userSignIn) {
      token
    }
  }
`;
export const CREATE_QUOTE = gql`
  mutation createQuote($quote: String!) {
    quote: createQuote(name: $quote)
  }
`;
