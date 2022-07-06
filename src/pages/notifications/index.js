import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { useMutation, useQuery } from 'react-apollo';

import {
  ALL_NOTIFICATIONS,
  GET_UNSEEN_NOTIFICATIONS,
} from '../../apollo/queries/notification';
import {
  SEE_NOTIFICATION,
  DELETE_NOTIFICATION,
} from '../../apollo/mutations/notification';

import EarliestNotifications from './SwitchNotifications/SwitchByDate/EarlierNotifications';
import RecentNotifications from './SwitchNotifications/SwitchByDate/RecentNotifications';
import AdminNavbar from '../../components/Navbars/AdminNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeaderStats from '../../components/Headers/HeaderStats';
import EmptyList from '../../components/_common/EmptyList';

const NotificationList = () => {
  const { data, loading } = useQuery(ALL_NOTIFICATIONS);

  const [selectedNotifications, setSelectNotification] = useState([]);

  const selectNotification = (person) => {
    if (selectedNotifications.find((id) => person.id === id)) {
      const newList = selectedNotifications.filter((id) => id !== person.id);
      setSelectNotification(newList);
    }
    if (!selectedNotifications.find((id) => person.id === id)) {
      setSelectNotification((oldArray) => [...oldArray, person.id]);
    }
  };

  const getSelectedNotifications = (person) =>
    selectedNotifications.find((personID) => personID === person.id);

  const [seeNotification] = useMutation(SEE_NOTIFICATION, {
    refetchQueries: [
      { query: ALL_NOTIFICATIONS },
      { query: GET_UNSEEN_NOTIFICATIONS },
    ],
  });
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION, {
    refetchQueries: [
      { query: ALL_NOTIFICATIONS },
      { query: GET_UNSEEN_NOTIFICATIONS },
    ],
  });

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        <HeaderStats />
        <div
          className="px-4 md:px-10 mx-auto w-full -m-24"
          style={{ marginTop: '-3rem', paddingBottom: '1rem' }}
        >
          <EmptyList page="notifications" data={data?.allNotifications} />
          <RecentNotifications
            data={data}
            loading={loading}
            seeNotification={seeNotification}
            deleteNotification={deleteNotification}
            getSelectedNotifications={getSelectedNotifications}
            selectNotification={selectNotification}
          />
          <EarliestNotifications
            data={data}
            loading={loading}
            seeNotification={seeNotification}
            deleteNotification={deleteNotification}
            getSelectedNotifications={getSelectedNotifications}
            selectNotification={selectNotification}
          />
        </div>
      </div>
      <Box
        position="fixed"
        bgcolor="#f7f7f7"
        width="100%"
        height="101vh"
        zIndex={-1}
      />
    </>
  );
};

export default NotificationList;
