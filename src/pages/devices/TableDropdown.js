import React, { useState } from 'react';
import { createPopper } from '@popperjs/core';
import { Edit, Visibility } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { useMutation } from '@apollo/react-hooks';

import { IconButton } from '@material-ui/core';
import { DELETE_DEVICE } from '../../apollo/mutations/device';
import { ALL_DEVICES } from '../../apollo/queries/device';
import EditModel from './EditModel';

const TableDropdown = ({ device }) => {
  const location = useHistory();
  const [editModel, setEditModel] = useState(false);
  const [showModel, setModel] = useState({ show: false, id: null });

  const getDevice = (id) => {
    setModel({
      show: !showModel.show,
      id,
    });
  };
  const [deleteDevice] = useMutation(DELETE_DEVICE, {
    refetchQueries: [{ query: ALL_DEVICES }],
  });

  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  return (
    <>
      <IconButton
        className="text-gray-600 py-1 px-3"
        href="#device"
        ref={btnDropdownRef}
        onClick={() => location.push(`/devices/${device.id}`)}
      >
        <Visibility style={{ fontSize: 16 }} />
      </IconButton>
      <IconButton
        className="text-gray-600 py-1 px-3"
        onClick={() => {
          createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: 'left-start',
          });
          setDropdownPopoverShow(!dropdownPopoverShow);
          getDevice(device.id);
        }}
      >
        <Edit style={{ fontSize: 16 }} />
      </IconButton>
      <div
        ref={popoverDropdownRef}
        className={`${
          dropdownPopoverShow ? 'block ' : 'hidden '
        }bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48`}
      >
        {showModel.show && device.id === showModel.id && (
          <>
            <a
              href="#pablo"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
              onClick={() => setEditModel(true)}
            >
              Edit Device
            </a>
            <EditModel
              device={device}
              open={editModel}
              onClose={() => {
                setEditModel(false);
                setModel(false);
                setDropdownPopoverShow(false);
              }}
            />
            <a
              href="#pablo"
              className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
              onClick={() =>
                deleteDevice({
                  variables: {
                    id: device.id,
                  },
                }).then(() => {
                  setModel(false);
                  setDropdownPopoverShow(false);
                })
              }
            >
              Delete Device
            </a>
          </>
        )}
      </div>
    </>
  );
};

export default TableDropdown;
