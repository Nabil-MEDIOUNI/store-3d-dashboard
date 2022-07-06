import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';

import App from './pages/_app';
import client from './apollo/initApollo';
import { UserInfoContextWrapper } from './components/UserInfo/UserInfoContext';

import GlobalLoader from './components/GlobalLoader';

import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.render(
  <>
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <UserInfoContextWrapper>
          <App />
        </UserInfoContextWrapper>
      </ApolloHooksProvider>
    </ApolloProvider>
    <GlobalLoader />
  </>,
  document.getElementById('root'),
);

window.addEventListener('load', () => {
  navigator.serviceWorker
    .register('./serviceworker.js')
    .then((reg) => console.log('Success: ', reg.scope))
    .catch((err) => console.log('Failure: ', err));
});
