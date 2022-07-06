import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useMutation } from '@apollo/react-hooks';

import MuiDialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/styles';
import {
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
  Button,
} from '@material-ui/core';

import { ALL_PEOPLE } from '../../apollo/queries/people';
import { UPDATE_PERSON } from '../../apollo/mutations/person';

import EditField from '../../components/_common/EditFields/EditField';
import Selecter from '../../components/_common/EditFields/Selecter';

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

const EditModel = ({ open, onClose, person }) => {
  const classes = useStyles({});
  const [data, setData] = useState({});
  useEffect(() => {
    setData({ ...person });
  }, [person]);

  const [updatePerson] = useMutation(UPDATE_PERSON, {
    refetchQueries: [
      {
        query: ALL_PEOPLE,
      },
    ],
  });

  const editPerson = (e) => {
    e.preventDefault();
    updatePerson({
      variables: {
        id: person.id,
        person: {
          first_name: data.first_name,
          last_name: data.last_name,
          full_name: data.full_name,
          email: data.email,
          is_admin: data.is_admin,
          is_verified: data.is_verified,
        },
      },
    }).then(() => {
      onClose();
    });
  };

  const adminSelecters = [
    { name: 'is admin', value: true },
    { name: 'is client', value: false },
  ];

  const verificattionSelecters = [
    { name: 'is verified', value: true },
    { name: 'is not verified', value: false },
  ];

  return (
    <MuiDialog
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
      fullWidth
      scroll="paper"
    >
      <DialogTitle className={classes.title}>Edit Person</DialogTitle>
      <DialogContent className={classes.content}>
        <Box>
          <Box mt={2}>
            <EditField
              label="Person Username"
              dfltVl={data.full_name}
              onChange={(e) => setData({ ...data, full_name: e.target.value })}
            />
          </Box>
          <Box mt={2}>
            <EditField
              label="Person Email"
              dfltVl={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Box>
          <Box mt={2}>
            <Selecter
              label="Person Verification"
              actions={verificattionSelecters}
              dfltVl={data.is_admin}
              handle={(e) => setData({ ...data, is_admin: e.target.value })}
            />
          </Box>
          <Box mt={2}>
            <Selecter
              label="Person Role"
              actions={adminSelecters}
              dfltVl={data.is_admin}
              handle={(e) => setData({ ...data, is_admin: e.target.value })}
            />
          </Box>
        </Box>
      </DialogContent>
      <Box pr={2}>
        <DialogActions>
          <Button onClick={onClose} color="default">
            Cancel
          </Button>
          <Button color="secondary" onClick={editPerson}>
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
