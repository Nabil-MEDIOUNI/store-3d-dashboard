import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { withStyles } from '@material-ui/styles';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import { useHistory } from 'react-router-dom';
import UserInfoContext from '../UserInfo/UserInfoContext';

const styles = () => ({
  speedDial: {
    position: 'fixed',
    bottom: 40,
    right: 32,
  },
});

const AddActions = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const { data, loading, togglePositionDevice } = useContext(UserInfoContext);
  const location = useHistory();

  if (loading) return '';

  const isAdmin = data?.currentPerson.is_admin;
  const handelcreatePosition = () => {
    togglePositionDevice();
    location.push('/3d-dashboard');
  };
  const actions = [
    {
      icon: (
        <AddLocationIcon
          style={{ fontSize: 20 }}
          onClick={handelcreatePosition}
        />
      ),
      name: 'Add Device Position',
      showIcon: isAdmin,
      key: 1,
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      className={classes.speedDial}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      title=""
      open={open}
      direction="up"
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.key}
          tooltipTitle={action.name}
          icon={action.icon}
        />
      ))}
    </SpeedDial>
  );
};

AddActions.propTypes = {
  createPosition: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddActions);
