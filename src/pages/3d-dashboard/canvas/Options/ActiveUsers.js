import React, { useState } from 'react';

import { Box, Typography } from '@material-ui/core';
import { More } from '@material-ui/icons';
import UserAvatar from '../../../../components/_common/Avatar';
import UsersListModel from './UsersListModel';

const ActiveUsers = ({ users }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Box
      onClick={() => setOpenModal(true)}
      style={{
        position: 'absolute',
        right: '1rem',
        top: '1rem',
        zIndex: 999999,
        cursor: 'pointer',
      }}
    >
      <Box
        style={{
          background: 'gray',
          padding: '3rem 5rem',
          position: 'relative',
          borderRadius: 2,
        }}
      >
        <Box
          style={{
            position: 'absolute',
            width: '100%',
            right: 0,
            top: 0,
            height: 30,
            borderBottom: '1px solid #989898',
            paddingTop: '0.25rem',
          }}
        >
          <Typography style={{ textAlign: 'center' }}>Active Users</Typography>
        </Box>
        <Box
          style={{
            position: 'absolute',
            bottom: '0.75rem',
            left: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {users?.connectedUsers[0].connected.length === 0 && (
            <Typography
              style={{
                fontFamily: 'inherit',
                marginLeft: '0.5rem',
                marginBottom: '0.75rem',
                fontWeight: 400,
              }}
            >
              {' '}
              No Active users!
            </Typography>
          )}
          {users?.connectedUsers[0].connected.splice(0, 2).map(({ user }) => (
            <Box style={{ marginLeft: '1rem' }} position="relative">
              <UserAvatar border size="2.5rem" src={user.cover_photo.url} />
              <Box
                style={{
                  position: 'absolute',
                  background: '#00b424',
                  width: 8,
                  height: 8,
                  right: 0,
                  bottom: 0,
                  borderRadius: '50%',
                }}
              />
            </Box>
          ))}
          {users?.connectedUsers[0].connected.length > 2 && (
            <Box
              style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
              position="relative"
            >
              <Box
                style={{
                  border: '1px solid black',
                  padding: '6px 7px',
                  borderRadius: '50%',
                }}
              >
                <More />
              </Box>
            </Box>
          )}
          <UsersListModel
            title="Active Users in store"
            open={openModal}
            onClose={() => setOpenModal(false)}
            data={users?.connectedUsers[0].connected}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ActiveUsers;
