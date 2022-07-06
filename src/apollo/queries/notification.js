import { gql } from 'apollo-boost';

export const GET_UNSEEN_NOTIFICATIONS = gql`
  query neverSeenNotifications {
    neverSeenNotifications {
      id
    }
  }
`;

export const ALL_NOTIFICATIONS = gql`
  query allNotifications {
    allNotifications {
      id
      title
      body
      type
      notified_to {
        can_view
      }
      seen_by {
        id
      }
      createdAt
    }
  }
`;
