import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getTokenWithExpiry } from '../../apollo/helpers/HandleToken';
import UserInfoContext from '../../components/UserInfo/UserInfoContext';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { data: user } = useContext(UserInfoContext);

  const isAdmin = user?.currentPerson.is_admin;

  return (
    <Route
      {...rest}
      render={(props) =>
        getTokenWithExpiry() && isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
