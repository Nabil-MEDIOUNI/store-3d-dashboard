import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getTokenWithExpiry } from '../../apollo/helpers/HandleToken';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      getTokenWithExpiry() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/sign-in',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
