import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Delete, Close } from '@material-ui/icons';
import { Button, IconButton } from '@material-ui/core';

import { useMutation } from '@apollo/react-hooks';

import UserAvatar from '../../components/_common/Avatar';
import WithSelect from '../../components/_common/Avatar/WithSelect';

import { ALL_PEOPLE } from '../../apollo/queries/people';
import { DELETE_MULTIPLE_PEOPLE } from '../../apollo/mutations/person';

import TableDropdown from './TableDropdown';

export default function CardTable({ color, data }) {
  const header = [
    'User',
    'Email',
    'N° Visits',
    'IS ADMIN',
    'IS VERIFIED',
    'Actions',
  ];
  const [deleteMultiplePeople] = useMutation(DELETE_MULTIPLE_PEOPLE, {
    refetchQueries: [{ query: ALL_PEOPLE }],
  });

  const [selectedUsers, setSelectUser] = useState([]);
  const selectUser = (user) => {
    if (selectedUsers.find((id) => user.id === id)) {
      const newList = selectedUsers.filter((id) => id !== user.id);
      setSelectUser(newList);
    }
    if (!selectedUsers.find((id) => user.id === id)) {
      setSelectUser((oldArray) => [...oldArray, user.id]);
    }
  };
  const getSelectedUsers = (user) =>
    selectedUsers.find((userID) => userID === user.id);

  const allusersID = data?.map(({ id }) => id);

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
                All Users Table
              </h3>
              {selectedUsers?.length > 0 && (
                <>
                  <Button
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => setSelectUser(allusersID)}
                  >
                    Select all
                  </Button>
                  <IconButton onClick={() => setSelectUser([])}>
                    <Close style={{ fontSize: 20 }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      deleteMultiplePeople({
                        variables: {
                          ids: selectedUsers,
                        },
                      }).then(() => {
                        setSelectUser([]);
                      });
                    }}
                  >
                    <Delete style={{ fontSize: 20 }} />
                  </IconButton>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table
            className="items-center w-full bg-transparent border-collapse"
            style={{ position: 'relative' }}
          >
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
              </tr>
            </thead>

            <tbody>
              {data?.length === 0 && (
                <h3 style={{ padding: '1rem 1.5rem' }}>No users was found!</h3>
              )}
              {data?.map((person) => (
                <tr
                  style={{
                    background: getSelectedUsers(person)
                      ? '#29abc41a'
                      : 'white',
                  }}
                  key={person.id}
                >
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                    <span
                      className={`ml-3 font-bold ${+(color === 'light'
                        ? 'text-gray-700'
                        : 'text-white')}`}
                      onClick={() => selectUser(person)}
                    >
                      <WithSelect isSelected={getSelectedUsers(person)}>
                        <UserAvatar src={person.cover_photo.url} size="30px" />
                      </WithSelect>
                    </span>
                    <span className="ml-3 font-bold text-gray-700">
                      {person.full_name || '-'}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4  text-gray-700">
                    {person.email || '-'}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4  text-gray-700">
                    {person.visits || '-'}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4  text-gray-700">
                    {person.is_admin ? 'is admin' : 'is client'}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4  text-gray-700">
                    {person.is_verified ? 'Verified' : 'Not verified'}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <TableDropdown person={person} />
                  </td>
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
