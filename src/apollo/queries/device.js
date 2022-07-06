import { gql } from 'apollo-boost';

export const GET_DEVICE = gql`
  query getDevice($id: ID!) {
    getDevice(id: $id) {
      id
      deviceId {
        entityType
        id
        credentialsType
        credentialsId
      }
      name
      visits
      type
      label
      position {
        id
        name
        values {
          posX
          posY
          posZ
        }
      }
      deviceProfileId {
        entityType
        id
      }
      temperature {
        ts
        value
      }
      battery {
        ts
        value
      }
      humidity {
        ts
        value
      }
      pressure {
        ts
        value
      }
    }
  }
`;

export const ALL_DEVICES = gql`
  query allDevices {
    allDevices {
      id
      deviceId {
        entityType
        id
        credentialsType
        credentialsId
      }
      name
      visits
      type
      label
      position {
        id
        name
        values {
          posX
          posY
          posZ
        }
      }
      deviceProfileId {
        entityType
        id
      }
      temperature {
        ts
        value
      }
      battery {
        ts
        value
      }
      humidity {
        ts
        value
      }
      pressure {
        ts
        value
      }
    }
  }
`;

export const ALL_DEVICE_POSITIONS = gql`
  query getDevicePositions {
    getDevicePositions {
      id
      name
      values {
        posX
        posY
        posZ
      }
    }
  }
`;
