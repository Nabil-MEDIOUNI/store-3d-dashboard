import React, { useContext } from 'react';

import { useQuery } from '@apollo/react-hooks';

import UserInfoContext from '../../components/UserInfo/UserInfoContext';
import { ALL_DEVICES } from '../../apollo/queries/device';

import CardTable from './CardTable';

import AdminNavbar from '../../components/Navbars/AdminNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeaderStats from '../../components/Headers/HeaderStats';
import FooterAdmin from '../../components/Footers/FooterAdmin';

export default function AllDevices() {
  const { data: user } = useContext(UserInfoContext);
  const isAdmin = user?.currentPerson.is_admin;
  const { data } = useQuery(ALL_DEVICES, { pollInterval: 5000 });

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <CardTable isAdmin={isAdmin} data={data?.allDevices} />
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
