/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import AuthNavbar from '../../../components/Navbars/AuthNavbar';
import SignInDisplay from './Display';

import Alert from '../../../utils/alert';

import {
  SIGNIN,
  SPECIAL_LOGIN,
} from '../../../apollo/mutations/authentification';
import { setTokenWithExpiry } from '../../../apollo/helpers/HandleToken';

export default function SignIn() {
  const [openAlert, setAlert] = useState(false);
  const [validationError, setError] = useState({ message: '' });
  const [remember, setRemember] = useState(false);
  const [email, addEmail] = useState('');
  const [password, addPassword] = useState('');

  const clickSubmit = (event) => {
    event.preventDefault();
    SIGNIN({ email, password, remember }).then((data) => {
      if (data.error) {
        setError({ message: `Graphql error: ${data.error}` });
        setAlert(true);
      } else {
        setTokenWithExpiry(data, remember);
        addEmail('');
        addPassword('');
        setAlert(true);
        setError('');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 500);
      }
    });
  };

  const specialLoginSubmit = (response) => {
    SPECIAL_LOGIN({ email: response.email || response.profileObj.email }).then(
      async (token) => {
        if (token.error) {
          setError({
            message: `Graphql error: ${token.error}`,
          });
          setAlert(true);
        } else {
          setError('');
          setAlert(true);
          setTokenWithExpiry(token, remember);
          window.location.href = '/';
        }
      },
    );
  };

  return (
    <>
      <AuthNavbar white transparent />
      <SignInDisplay
        addPassword={addPassword}
        addEmail={addEmail}
        setRemember={setRemember}
        clickSubmit={clickSubmit}
        specialLoginSubmit={specialLoginSubmit}
        email={email}
        password={password}
      />
      {Alert(
        validationError,
        openAlert,
        () => setAlert(false),
        "You've logged in successfully!",
      )}
    </>
  );
}
