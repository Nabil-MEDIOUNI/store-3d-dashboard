import React, { useEffect, useContext } from 'react';
import { useMutation } from 'react-apollo';

import { VISIT_STORE } from '../../apollo/mutations/currentPerson';
import { USER_INFO } from '../../apollo/queries/userQueries';
import CarrefourCanvas from './canvas/App';

import UserInfoContext from '../../components/UserInfo/UserInfoContext';

const Dashboard3D = () => {
  const { data } = useContext(UserInfoContext);
  const [visitStore] = useMutation(VISIT_STORE, {
    refetchQueries: [{ query: USER_INFO }],
  });

  useEffect(() => {
    if (!navigator.onLine) {
      const OFFLINE_CONTAINER = document.getElementById('offline_container');
      const DASHBOARD_CONTAINER = document.getElementById(
        'dashboard_container',
      );
      OFFLINE_CONTAINER.style.display = 'block';
      DASHBOARD_CONTAINER.style.display = 'none';
    }
    if (data) {
      localStorage.setItem('currentUser', JSON.stringify(data));

      if (data.currentPerson?.is_deleted) {
        window.location.href = '/logout';
      }
      visitStore();
    }
  }, [data, visitStore]);

  return <CarrefourCanvas />;
};

export default Dashboard3D;
