import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://127.0.0.1:4000/graphql",
  credentials: "include",
});
export const client = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
