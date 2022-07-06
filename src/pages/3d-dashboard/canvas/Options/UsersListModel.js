import React from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core';

import { Clear, Search } from '@material-ui/icons';
import useStyles from './styles';
import UserAvatar from '../../../../components/_common/Avatar';
import ToLower from '../../../../utils/toLower';

const UsersListModel = ({ data, title, open, onClose }) => {
  const classes = useStyles();

  const [search, setSearch] = React.useState('');

  const UpdateSearch = (event) => {
    setSearch(event.target.value.substr(0, 20));
  };
  const people = data?.filter(
    (person) =>
      ToLower(person?.user.full_name)?.indexOf(ToLower(search)) !== -1,
  );

  return (
    <>
      {data?.length !== 0 && (
        <Dialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={onClose}
          fullWidth
          scroll="paper"
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <Box
              pb={2}
              display="flex"
              flexDirection="column"
              position="relative"
            >
              <Box className={classes.searchContatiner} pb={2}>
                <Search className={classes.searchIcon} />
                <input
                  className={classes.searchInput}
                  value={search}
                  onChange={(e) => UpdateSearch(e)}
                  placeholder="Search by name"
                />
                {search.length > 1 && (
                  <IconButton
                    style={{ position: 'absolute', right: '0.5rem' }}
                    onClick={() => setSearch('')}
                  >
                    <Clear style={{ fontSize: 17 }} />
                  </IconButton>
                )}
              </Box>
              {people?.map((person) => (
                <Box display="flex" alignItems="center" my={1}>
                  <Box position="relative" width="fit-content" mx={1}>
                    <UserAvatar
                      size="28px"
                      border="1px solid #e0e0e0"
                      src={person?.user.cover_photo.url}
                    />
                  </Box>
                  <Box ml={1}>
                    <Typography style={{ textTransform: 'capitalize' }}>
                      {person?.user.full_name}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default UsersListModel;
