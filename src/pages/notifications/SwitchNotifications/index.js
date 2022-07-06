import React from 'react';

import NotificationDisplay from './Display';
import { Content } from './SwitchContent';

const SwitchNotifications = ({
  data,
  seeNotification,
  deleteNotification,
  getSelectedNotifications,
  selectNotification,
}) => (
  <>
    {data?.map((notification) => (
      <NotificationDisplay
        seeNotification={seeNotification}
        deleteNotification={deleteNotification}
        notification={notification}
        content={Content(notification)}
        getSelectedNotifications={getSelectedNotifications}
        selectNotification={selectNotification}
      />
    ))}
  </>
);

export default SwitchNotifications;
