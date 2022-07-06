import React from 'react';
import { Typography } from '@material-ui/core';

export const Content = (notification) => (
  <Typography
    style={{
      marginLeft: 12,
      overflow: 'hidden',
      display: '-webkit-box',
      '-webkit-line-clamp': '2',
      '-webkit-box-orient': 'vertical',
    }}
    variant="caption"
  >
    <span style={{ fontWeight: 700 }}>{notification.title}</span>{' '}
    {notification.body}
  </Typography>
);
