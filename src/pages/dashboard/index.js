import React, { useEffect, useState, useContext } from 'react';

import Axios from 'axios';
import { useQuery } from '@apollo/react-hooks';

import { ALL_DEVICES } from '../../apollo/queries/device';
import { ALL_PEOPLE } from '../../apollo/queries/people';

import UserInfoContext from '../../components/UserInfo/UserInfoContext';
import AdminNavbar from '../../components/Navbars/AdminNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import FooterAdmin from '../../components/Footers/FooterAdmin';

import CardBarChart from './CardBarChart';
import Users from './Users';
import Devices from './Devices';
import HeaderStats from './HeaderStats';

function SET_OS_USER(data) {
  const OS_USER = localStorage.getItem('os-user');
  const OS_DATA = JSON.stringify({
    app_id: '35dd9083-8523-4adc-a37b-c080e05d30c8',
    tags: {
      id: data?.currentPerson.id,
      name: data?.currentPerson.full_name,
      is_admin: data?.currentPerson.is_admin,
    },
  });

  Axios.put(`https://onesignal.com/api/v1/players/${OS_USER}`, OS_DATA, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default function Dashboard() {
  const { data } = useContext(UserInfoContext);
  const { data: devices } = useQuery(ALL_DEVICES, { pollInterval: 5000 });
  const { data: allPeople } = useQuery(ALL_PEOPLE);
  const [device, setDevice] = useState({});
  useEffect(() => {
    setDevice(devices?.allDevices[0]);
    if (data) {
      localStorage.setItem('currentUser', JSON.stringify(data));

      if (data.currentPerson?.is_deleted) {
        window.location.href = '/logout';
      }
      SET_OS_USER(data);
    }
  }, [data, devices]);

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        <HeaderStats showstats device={device} />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
              <Devices
                selectedDevice={device}
                setDevice={setDevice}
                data={devices}
              />
              <Users data={allPeople} />
            </div>
            <div className="w-full xl:w-4/12 px-4">
              <CardBarChart />
            </div>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
