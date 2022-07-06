import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  DialogTitle,
  DialogContent,
  Box,
  Button,
  DialogActions,
  Dialog,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useMutation } from 'react-apollo';
import EditField from '../../_common/EditFields/EditField';
import Alert from '../../../utils/alert';
import { CREATE_DEVICE_POSITION } from '../../../apollo/mutations/device';
import { ALL_DEVICE_POSITIONS } from '../../../apollo/queries/device';
import SendNotification from './SendNotification';

const useStyles = makeStyles(() => ({
  title: {
    marginTop: 8,
  },
  content: {
    marginTop: 8,
  },
  margin: {
    marginBottom: 16,
    width: '100%',
  },
}));

const CreatePosition = ({ open, onClose, position }) => {
  const classes = useStyles({});
  const [createDevicePosition, { error }] = useMutation(
    CREATE_DEVICE_POSITION,
    {
      refetchQueries: [{ query: ALL_DEVICE_POSITIONS }],
    },
  );

  const [openAlert, setAlert] = useState(false);
  const [name, setName] = useState('');

  const addPosition = (e) => {
    e.preventDefault();
    createDevicePosition({
      variables: {
        position: {
          name,
          values: {
            posX: parseInt(position.posX, 10),
            posY: parseInt(position.posY, 10),
            posZ: parseInt(position.posZ, 10),
          },
        },
      },
    }).then(() => {
      SendNotification(
        'anyone',
        'Device Position Creation',
        `a new device position is created: ${name}`,
      );
      onClose();
      window.location.href = '/device-positions';
    });
  };

  const fields = [
    {
      label: 'Position Name',
      onChange: (e) => setName(e.target.value),
      type: 'text',
      key: 1,
    },
    {
      label: 'Position X',
      type: 'number',
      value: position?.posX,
      key: 1,
    },
    {
      label: 'Position Y',
      type: 'number',
      value: 2,
      key: 2,
    },
    {
      label: 'Position Z',
      type: 'number',
      value: position?.posZ,
      key: 3,
    },
  ];

  return (
    <>
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
        fullWidth
        scroll="paper"
      >
        <DialogTitle className={classes.title}>Add Device Position</DialogTitle>
        <DialogContent className={classes.content}>
          <Box>
            <form>
              {fields.map((field) => (
                <EditField
                  margin
                  key={field.key}
                  onChange={field.onChange}
                  type={field.type}
                  value={field.value}
                  label={field.label}
                  required={field.req}
                />
              ))}
            </form>
          </Box>
        </DialogContent>
        <DialogActions style={{ paddingRight: 16 }}>
          <Button onClick={onClose} color="default">
            Cancel
          </Button>
          <Button disabled={name === ''} onClick={addPosition} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      {Alert(
        error,
        openAlert,
        () => setAlert(false),
        'Position created successfully!',
      )}
    </>
  );
};

CreatePosition.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreatePosition;
