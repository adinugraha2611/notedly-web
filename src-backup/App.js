import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  createHttpLink,
  ApolloProvider,
  InMemoryCache
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import Pages from '/pages';
import GlobalStyle from './components/GlobalStyle';

// set uri to link in the .env (localhost:4000/api)
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
// set cache
// apa isinya? dimana disimpannya?
const cache = new InMemoryCache();
// check for a token and return the headers to the context
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});

// configure apollo client (similar to React context api, these are createContext())
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  // put resolvers queries into cache
  resolvers: {},
  connectToDevTools: true
});

// check for a local token
const data = {
  isLoggedIn: !!localStorage.getItem('token')
};
// write the cache data on initial load
cache.writeData({ data });
// write the cache data after cache is reset
client.onResetStore(() => cache.writeData({ data }));

const App = () => {
  return (
    // semua di wrap dengan ApolloProvider agar semua component/page bisa mengakses data apollo client yang kita tentukan di atas. Di sini, kita akan provide client.
    // konsepnya sama seperti context provider di react
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
