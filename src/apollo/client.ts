import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { loginStatusVar } from "./reactiveVar/loginStatus";
const httpLink = new HttpLink({
  uri: "http://127.0.0.1:4000/graphql",
  credentials: "include",
});
const headersTokenLink = setContext(async (_, { headers = {} }) => {
  const accessToken = loginStatusVar().accessToken;
  return {
    headers: {
      ...headers,
      ACCESS_TOKEN: accessToken,
    },
  };
});
export const client = new ApolloClient({
  link: from([headersTokenLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
