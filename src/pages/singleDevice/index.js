import React from 'react';

import { useQuery } from '@apollo/react-hooks';

import CardSettings from './CardSettings';
import CardProfile from './CardProfile';
import { GET_DEVICE } from '../../apollo/queries/device';

import AdminNavbar from '../../components/Navbars/AdminNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeaderStats from './HeaderStats';
import FooterAdmin from '../../components/Footers/FooterAdmin';

export default function SingleDevice({ match }) {
  const { data } = useQuery(GET_DEVICE, {
    variables: {
      id: match.params.id,
    },
  });

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        <HeaderStats device={data?.getDevice} showstats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-8/12 px-4">
              <CardSettings />
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <CardProfile data={data?.getDevice} />
            </div>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
