import { REST_API } from '../config';

export const SIGNIN = (login) =>
  fetch(`${REST_API}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(login),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });

export const SIGNUP = (login) =>
  fetch(`${REST_API}/auth/sign-up`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(login),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });

export const SPECIAL_LOGIN = (login) =>
  fetch(`${REST_API}/auth/special-login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(login),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });

export const validateUser = () =>
  fetch(`${REST_API}/auth/validate-user`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: localStorage.getItem('validation'),
  })
    .then(() => localStorage.clear('validation'))
    .catch((err) => {
      console.log(err);
    });

export const FORGOT_PASSWORD = (data) =>
  fetch(`${REST_API}/auth/reset-password`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });

export const CHANGE_PASSWORD = (data) =>
  fetch(`${REST_API}/auth/change-password`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
