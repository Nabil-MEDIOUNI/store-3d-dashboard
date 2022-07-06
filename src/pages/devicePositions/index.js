import React, { useState } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';

import { DELETE_DEVICE_POSITION } from '../../apollo/mutations/device';
import { ALL_DEVICE_POSITIONS } from '../../apollo/queries/position';

import AddActions from '../../components/AddActions';

import CardTable from './CardTable';
import CreatePosition from '../../components/AddActions/CreatePosition';

import AdminNavbar from '../../components/Navbars/AdminNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeaderStats from '../../components/Headers/HeaderStats';
import FooterAdmin from '../../components/Footers/FooterAdmin';

export default function DevicePositions() {
  const { data } = useQuery(ALL_DEVICE_POSITIONS);
  const [deleteDevicePosition] = useMutation(DELETE_DEVICE_POSITION, {
    refetchQueries: [{ query: ALL_DEVICE_POSITIONS }],
  });
  const [positionModal, setPositionModal] = useState(false);
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
          <CardTable
            data={data?.getDevicePositions}
            deleteDevicePosition={deleteDevicePosition}
          />
          <AddActions createPosition={() => setPositionModal(true)} />
          <CreatePosition
            open={positionModal}
            onClose={() => setPositionModal(false)}
          />
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
