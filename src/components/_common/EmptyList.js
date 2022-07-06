import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const EmptyList = ({ data, page }) => (
  <>
    {data?.length === 0 && (
      <Box
        position="fixed"
        top="55%"
        left="60%"
        style={{ transform: 'translate(-50%, -50%)' }}
        width="100%"
        textAlign="center"
      >
        <Box>
          <img
            style={{ margin: '0 auto' }}
            width="140px"
            src="/static/img/list.webP"
            alt=""
          />
        </Box>
        <Typography>Couldn't find {page}</Typography>
        <Typography>Contact if you're facing a trouble</Typography>
      </Box>
    )}
  </>
);

EmptyList.propTypes = {
  page: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default EmptyList;
