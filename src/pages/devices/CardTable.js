import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Delete, Refresh, Close } from '@material-ui/icons';
import { Button, IconButton } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';

import TableDropdown from './TableDropdown';
import UserAvatar from '../../components/_common/Avatar';
import WithSelect from '../../components/_common/Avatar/WithSelect';
import {
  ADD_DEVICES,
  ADD_DEVICES_TEMPERATURE,
  DELETE_MULTIPLE_DEVICES,
} from '../../apollo/mutations/device';
import { ALL_DEVICES } from '../../apollo/queries/device';

export default function CardTable({ color, data, isAdmin }) {
  const header = ['Device', 'Position', 'Type', 'Label', 'Temperature'];
  const [deleteMultipleDevices] = useMutation(DELETE_MULTIPLE_DEVICES, {
    refetchQueries: [{ query: ALL_DEVICES }],
  });

  const [refreshDevices] = useMutation(ADD_DEVICES);

  const [refreshDevicesTemperature] = useMutation(ADD_DEVICES_TEMPERATURE, {
    refetchQueries: [{ query: ALL_DEVICES }],
  });

  const [selectedDevices, setSelectDevice] = useState([]);
  const selectDevice = (device) => {
    if (selectedDevices.find((id) => device.id === id)) {
      const newList = selectedDevices.filter((id) => id !== device.id);
      setSelectDevice(newList);
    }
    if (!selectedDevices.find((id) => device.id === id)) {
      setSelectDevice((oldArray) => [...oldArray, device.id]);
    }
  };
  const getSelectedDevices = (device) =>
    selectedDevices.find((deviceID) => deviceID === device.id);

  const allDevicesID = data?.map(({ id }) => id);

  return (
    <>
      <div
        className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ${
          color === 'light' ? 'bg-white' : 'bg-blue-900 text-white'
        }`}
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div
              style={{ display: 'flex', alignItems: 'center' }}
              className="relative w-full px-4 max-w-full flex-grow flex-1"
            >
              <h3
                style={{ marginTop: 0, marginBottom: 0 }}
                className={`font-semibold text-lg ${
                  color === 'light' ? 'text-gray-800' : 'text-white'
                }`}
              >
                All Devices Table
              </h3>
              {selectedDevices?.length > 0 && (
                <>
                  <Button
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => setSelectDevice(allDevicesID)}
                  >
                    Select all
                  </Button>
                  <IconButton onClick={() => setSelectDevice([])}>
                    <Close style={{ fontSize: 20 }} />
                  </IconButton>
                  {isAdmin && (
                    <IconButton
                      onClick={() => {
                        deleteMultipleDevices({
                          variables: {
                            ids: selectedDevices,
                          },
                        }).then(() => {
                          setSelectDevice([]);
                        });
                      }}
                    >
                      <Delete style={{ fontSize: 20 }} />
                    </IconButton>
                  )}
                </>
              )}
              {isAdmin && selectedDevices?.length === 0 && (
                <IconButton
                  onClick={() =>
                    refreshDevices().then(() => refreshDevicesTemperature())
                  }
                  style={{
                    marginLeft: selectedDevices?.length === 0 && '0.5rem',
                  }}
                >
                  <Refresh style={{ fontSize: 20 }} />
                </IconButton>
              )}
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {header.map((name) => (
                  <th
                    className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left ${
                      color === 'light'
                        ? 'bg-gray-100 text-gray-600 border-gray-200'
                        : 'bg-blue-800 text-blue-300 border-blue-700'
                    }`}
                  >
                    {name}
                  </th>
                ))}
                {isAdmin && (
                  <th
                    className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left ${
                      color === 'light'
                        ? 'bg-gray-100 text-gray-600 border-gray-200'
                        : 'bg-blue-800 text-blue-300 border-blue-700'
                    }`}
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {data?.length === 0 && (
                <h3 style={{ padding: '1rem 1.5rem' }}>
                  No devices was found!
                </h3>
              )}
              {data?.map((device) => (
                <tr
                  style={{
                    background: getSelectedDevices(device)
                      ? '#29abc41a'
                      : 'white',
                  }}
                  key={device.id}
                >
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                    <span
                      className={`ml-3 font-bold ${+(color === 'light'
                        ? 'text-gray-700'
                        : 'text-white')}`}
                      onClick={() => selectDevice(device)}
                    >
                      <WithSelect isSelected={getSelectedDevices(device)}>
                        <UserAvatar
                          src={`https://cdn-expa.aiesec.org/gis-img/missing_profile_${device.name
                            ?.replace(/\s/g, '')
                            .charAt(0)
                            .toLowerCase()}.svg`}
                          size="30px"
                        />
                      </WithSelect>
                    </span>
                    <span className={`ml-3 font-bold text-gray-700`}>
                      {device.name || '-'}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4  text-gray-700">
                    {device.position?.name || '-'}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4  text-gray-700">
                    {device.type || '-'}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4  text-gray-700">
                    {device.label || '-'}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4  text-gray-700">
                    <div className="flex items-center">
                      {device?.temperature.value ? (
                        <>
                          <span className="mr-2">
                            {device?.temperature.value}%
                          </span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                              <div
                                style={{
                                  width: `${device?.temperature.value}%`,
                                }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <p>-</p>
                      )}
                    </div>
                  </td>
                  {isAdmin && (
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      <TableDropdown device={device} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: 'light',
};

CardTable.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
};
