import { REST_API } from '../config';

export const CONTACT_US = (data) =>
  fetch(`${REST_API}/auth/contact-us`, {
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
