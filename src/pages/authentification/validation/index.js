/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { validateUser } from '../../../apollo/mutations/authentification';

const UserValidation = () => {
  useEffect(() => {
    validateUser().then(() => {
      setTimeout(() => {
        window.location.href = '/sign-in';
      }, 1000);
    });
  });

  return <p>redirecting...</p>;
};

export default UserValidation;
