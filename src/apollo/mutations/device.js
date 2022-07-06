import { gql } from 'apollo-boost';

export const ADD_DEVICES = gql`
  mutation refreshDevices {
    refreshDevices {
      id
    }
  }
`;

export const UPDATE_DEVICE_TEMPERATURE = gql`
  mutation updateDeviceTemperature($id: ID!, $temperature: String!) {
    updateDeviceTemperature(id: $id, temperature: $temperature) {
      id
    }
  }
`;

export const ADD_DEVICES_TEMPERATURE = gql`
  mutation refreshDevicesTemperature {
    refreshDevicesTemperature {
      id
    }
  }
`;

export const CREATE_DEVICE_POSITION = gql`
  mutation createDevicePosition($position: PositionInput) {
    createDevicePosition(position: $position) {
      id
    }
  }
`;

export const SET_DEVICE_POSITION = gql`
  mutation setDevicePosition($id: ID!, $position: ID!) {
    setDevicePosition(id: $id, position: $position) {
      id
    }
  }
`;

export const DELETE_DEVICE = gql`
  mutation deleteDevice($id: ID!) {
    deleteDevice(id: $id) {
      id
    }
  }
`;

export const DELETE_MULTIPLE_DEVICES = gql`
  mutation deleteMultipleDevices($ids: [ID]) {
    deleteMultipleDevices(ids: $ids) {
      id
    }
  }
`;
export const DELETE_DEVICE_POSITION = gql`
  mutation deleteDevicePosition($id: ID!) {
    deleteDevicePosition(id: $id) {
      id
    }
  }
`;
