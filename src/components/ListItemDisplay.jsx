// components/ListItemDisplay.jsx

import React from 'react';
import PropTypes from 'prop-types';

export const ListItemDisplay = ({ itemValue, bullet, onItemEdit }) => (
  <div onClick={onItemEdit}>
    {bullet}.&nbsp;
    {itemValue}
  </div>
);

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  itemValue: PropTypes.string.isRequired,
  bullet: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onItemEdit: PropTypes.func.isRequired,
};
