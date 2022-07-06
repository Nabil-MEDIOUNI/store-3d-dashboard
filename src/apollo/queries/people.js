import { gql } from 'apollo-boost';

export const ALL_PEOPLE = gql`
  query allPeople {
    allPeople {
      id
      full_name
      cover_photo {
        url
      }
      email
      is_admin
      is_verified
      visits
    }
  }
`;
