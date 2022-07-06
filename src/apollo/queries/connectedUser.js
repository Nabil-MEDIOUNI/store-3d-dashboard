import { gql } from 'apollo-boost';

export const ALL_USERS_CONNECTED = gql`
  query connectedUsers {
    connectedUsers {
      connected {
        user {
          full_name
          id
          cover_photo {
            url
          }
        }
        values {
          posX
          posY
          posZ
        }
      }
    }
  }
`;
