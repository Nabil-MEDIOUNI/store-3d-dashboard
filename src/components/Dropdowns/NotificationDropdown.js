import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from 'react-apollo';

import { Box, Typography } from '@material-ui/core';

import { GET_UNSEEN_NOTIFICATIONS } from '../../apollo/queries/notification';

const NotificationDropdown = ({ white }) => {
  const location = useHistory();
  const { data } = useQuery(GET_UNSEEN_NOTIFICATIONS);
  const notificationsExist = data?.neverSeenNotifications.length;

  return (
    <Box
      position="relative"
      mr={1}
      onClick={() => location.push('/notifications')}
    >
      {notificationsExist > 0 && (
        <Box
          style={{
            position: 'absolute',
            background: '#f85a40',
            right: 0,
            top: -5,
            zIndex: 3,
            borderRadius: 10,
          }}
        >
          <Typography
            style={{
              fontSize: 10,
              color: 'white',
              padding: '0px 6px',
            }}
          >
            {notificationsExist}
          </Typography>
        </Box>
      )}
      <Link className="text-gray-600 block py-1 px-3">
        <i
          className="fas fa-bell"
          style={{ fontSize: 20, color: white && 'white' }}
        />
      </Link>
    </Box>
  );
};

export default NotificationDropdown;
