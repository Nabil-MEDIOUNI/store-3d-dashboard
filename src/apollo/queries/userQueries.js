import { gql } from 'apollo-boost';

export const USER_INFO = gql`
  query currentPerson {
    currentPerson {
      id
      first_name
      last_name
      full_name
      cover_photo {
        url
      }
      address
      city
      country
      postal_code
      email
      is_admin
    }
  }
`;
