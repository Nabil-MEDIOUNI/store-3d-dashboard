/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import AuthNavbar from '../../../components/Navbars/AuthNavbar';
import SignUpDisplay from './Display';
import { SIGNUP } from '../../../apollo/mutations/authentification';

import Alert from '../../../utils/alert';
import validateForm from '../../../utils/validateForm';
import SendNotification from './SendNotification';

export default function SignUp() {
  const location = useHistory();

  const [openAlert, setAlert] = useState(false);
  const [validationError, setError] = useState({ message: '' });
  const [email, addEmail] = useState('');
  const [password, addPassword] = useState('');
  const [first_name, addFirstName] = useState('');
  const [last_name, addLastName] = useState('');

  const clickSubmit = (event) => {
    event.preventDefault();
    SIGNUP({
      email,
      password,
      first_name,
      last_name,
    }).then((data) => {
      if (!validateForm(first_name, email, setError, setAlert)) return false;
      if (data.error) {
        setError({ message: `Graphql error: ${data.error}` });
        setAlert(true);
      } else {
        SendNotification(
          'admin',
          'Account Creation',
          'new account is created!',
        );
        addEmail('');
        addPassword('');
        addFirstName('');
        addLastName('');
        setAlert(true);
        setError('');
        localStorage.setItem('validation', JSON.stringify(data.validation));
        setTimeout(() => {
          location.push('/sign-in');
        }, 500);
      }
    });
  };

  return (
    <>
      <AuthNavbar white transparent />
      <SignUpDisplay
        addEmail={addEmail}
        addPassword={addPassword}
        addFirstName={addFirstName}
        addLastName={addLastName}
        clickSubmit={clickSubmit}
        email={email}
        password={password}
        first_name={first_name}
        last_name={last_name}
      />
      {Alert(
        validationError,
        openAlert,
        () => setAlert(false),
        'Please validate your email!',
      )}
    </>
  );
}
