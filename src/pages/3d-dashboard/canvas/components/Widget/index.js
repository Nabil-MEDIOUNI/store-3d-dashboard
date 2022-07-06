import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

const Widget = ({ title, children, styleName }) => (
  <Card
    title={title}
    className={`gx-card-widget bg-white ${styleName}`}
    style={{ padding: '5px', borderRadius: '4px' }}
  >
    {children}
  </Card>
);

export default Widget;
Widget.defaultProps = {
  styleName: '',
  title: '',
};

Widget.propTypes = {
  title: PropTypes.string,
  styleName: PropTypes.string,
  children: PropTypes.node.isRequired,
};
