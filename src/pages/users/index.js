import React from 'react';

import { useQuery } from '@apollo/react-hooks';

import { ALL_PEOPLE } from '../../apollo/queries/people';

import CardTable from './CardTable';

import AdminNavbar from '../../components/Navbars/AdminNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeaderStats from '../../components/Headers/HeaderStats';
import FooterAdmin from '../../components/Footers/FooterAdmin';

export default function AllUsers() {
  const { data } = useQuery(ALL_PEOPLE);
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        <HeaderStats />
        <div
          className="px-4 md:px-10 mx-auto w-full -m-24"
          style={{ height: '79vh' }}
        >
          <CardTable data={data?.allPeople} />
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
