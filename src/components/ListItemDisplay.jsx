// components/ListItemDisplay.jsx

import React from 'react';
import PropTypes from 'prop-types';

export const ListItemDisplay = ({ item: { value, bullet }, onEdit }) => (
  <div onClick={onEdit}>
    {bullet}.&nbsp;
    {value}
  </div>
);

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  item: PropTypes.shape({
    bullet: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    value: PropTypes.string,
  }).isRequired,

  onEdit: PropTypes.func.isRequired,
};
