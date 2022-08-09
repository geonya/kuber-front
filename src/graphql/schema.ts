import { gql } from '@apollo/client';

gql`
  mutation Login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;
