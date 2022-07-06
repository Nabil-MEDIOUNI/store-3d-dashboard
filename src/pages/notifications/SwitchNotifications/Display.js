import React, { useContext, useState } from 'react';

import { Box, IconButton, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import UserAvatar from '../../../components/_common/Avatar';
import Divider from '../../../components/_common/Divider';
import { CommenteddAt } from '../../../utils/dateTimeService';
import UserInfoContext from '../../../components/UserInfo/UserInfoContext';
import OptionsModel from '../OptionsModel';
import WithSelect from '../../../components/_common/Avatar/WithSelect';

const NotificationDisplay = ({
  notification,
  content,
  seeNotification,
  deleteNotification,
  getSelectedNotifications,
  selectNotification,
}) => {
  const { data: user } = useContext(UserInfoContext);
  const [deleteModel, setDeleteModel] = useState({
    id: '',
    model: false,
  });
  const location = useHistory();
  const viewedNotification = notification.seen_by.find(
    ({ id }) => id === user?.currentPerson.id,
  );

  return (
    <>
      <Box
        width="100%"
        py={1.25}
        bgcolor={viewedNotification ? 'white' : '#29abc41a'}
        style={{
          background: getSelectedNotifications(notification) && '#29abc41a',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" ml={2.5}>
            <Box onClick={() => selectNotification(notification)}>
              <WithSelect isSelected={getSelectedNotifications(notification)}>
                <UserAvatar
                  size="34px"
                  src="https://res.cloudinary.com/sofia-technologies/image/upload/v1618445132/favicon_czxgdr.png"
                />
              </WithSelect>
            </Box>
            <Box
              ml={1.5}
              onClick={() => {
                seeNotification({
                  variables: {
                    id: notification.id,
                  },
                }).then(() => {
                  if (notification.type === 'new_account') {
                    location.push('/users');
                  }
                  if (notification.type === 'new_device_position') {
                    location.push('/device-positions');
                  }
                });
              }}
            >
              {content}
            </Box>
          </Box>
          <Box
            mr={0.5}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <IconButton
              onClick={() =>
                setDeleteModel({
                  id: notification.id,
                  model: !deleteModel.model,
                })
              }
            >
              <MoreVert style={{ fontSize: 16 }} />
            </IconButton>
            <OptionsModel
              deleteModel={deleteModel}
              setDeleteModel={setDeleteModel}
              deleteNotification={deleteNotification}
              id={notification.id}
            />
            <Typography style={{ fontSize: 10 }} variant="caption">
              {CommenteddAt(notification.createdAt)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider marginTop="0px" height />
    </>
  );
};

export default NotificationDisplay;
