// components/ListItemDisplay.jsx

import React from 'react';
import PropTypes from 'prop-types';

export const ListItemDisplay = ({ itemValue, bullet, onEdit }) => (
  <div onClick={onEdit}>
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
  onEdit: PropTypes.func.isRequired,
};
