import React from 'react';
import { Delete } from '@material-ui/icons';

import { IconButton } from '@material-ui/core';

const TableDropdown = ({ position, deleteDevicePosition }) => (
  <IconButton
    className="text-gray-600 py-1 px-3"
    onClick={() => deleteDevicePosition({ variables: { id: position.id } })}
  >
    <Delete style={{ fontSize: 16 }} />
  </IconButton>
);

export default TableDropdown;
