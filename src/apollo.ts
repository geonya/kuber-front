import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { LOCALSTORAGE_TOKEN } from './constants';

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

// const logout = () => {
//   isLoggedInVar(false);
//   localStorage.removeItem(LOCALSTORAGE_TOKEN);
// };

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: { headers: any }) => ({
    headers: { 'x-jwt': authTokenVar() || '', ...headers },
  }));
  return forward(operation);
});
const additiveLink = from([authLink, httpLink]);

export const client = new ApolloClient({
  link: additiveLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
