import { gql } from 'apollo-boost';

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
