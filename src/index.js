import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from 'containers/App';
import history from './utils/history';

import 'semantic-ui-css/semantic.min.css';
import './ress.min.css';
import './common.css';

const uri = process.env.NODE_ENV === 'production'
  ? 'Set uri for production here'
  : process.env.REACT_APP_GRAPHQL_URI;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    credentials: 'include',
    uri,
  }),
});

ReactDOM.render(
  <Router history={history}>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
