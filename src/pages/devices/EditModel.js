import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useQuery, useMutation } from '@apollo/react-hooks';

import MuiDialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/styles';
import {
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SET_DEVICE_POSITION } from '../../apollo/mutations/device';
import { ALL_DEVICE_POSITIONS } from '../../apollo/queries/device';

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
  userName: {
    fontWeight: 500,
    textTransform: 'capitalize',
    color: '#037ef3',
  },
}));

const EditModel = ({ open, onClose, device }) => {
  const classes = useStyles({});
  const [openAutocompletePosition, setOpenPosition] = useState(false);
  const [position, setPositionID] = useState('');
  const { data } = useQuery(ALL_DEVICE_POSITIONS);

  const [setDevicePosition] = useMutation(SET_DEVICE_POSITION);

  const editDevice = (e) => {
    e.preventDefault();
    if (position) {
      setDevicePosition({
        variables: {
          id: device.id,
          position,
        },
      }).then(() => {
        onClose();
      });
    }
  };

  return (
    <MuiDialog
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
      fullWidth
      scroll="paper"
    >
      <DialogTitle className={classes.title}>Edit Device</DialogTitle>
      <DialogContent className={classes.content}>
        <Box>
          <Box mt={2}>
            <Autocomplete
              open={openAutocompletePosition}
              fullWidth
              onOpen={() => setOpenPosition(true)}
              onClose={() => setOpenPosition(false)}
              getOptionSelected={(option, value) => option.name === value.name}
              onChange={(_, value) => setPositionID(value?.id)}
              getOptionLabel={(option) => option.name}
              options={data?.getDevicePositions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Position"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Box>
        </Box>
      </DialogContent>
      <Box pr={2}>
        <DialogActions>
          <Button onClick={onClose} color="default">
            Cancel
          </Button>
          <Button color="secondary" onClick={editDevice}>
            Apply
          </Button>
        </DialogActions>
      </Box>
    </MuiDialog>
  );
};

EditModel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditModel;
