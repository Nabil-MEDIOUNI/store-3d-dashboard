import { gql } from 'apollo-boost';

export const CONNECT_USER = gql`
  mutation connecteduserUpdate($user: Connectedinput) {
    connecteduserUpdate(user: $user) {
      id
    }
  }
`;
export const DISCONNECT_USER = gql`
  mutation deconnecteduser($user: Connectedinput) {
    deconnecteduser(user: $user) {
      id
    }
  }
`;
