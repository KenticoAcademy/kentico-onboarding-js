// components/ListItemDisplay.jsx

import React from 'react';
import PropTypes from 'prop-types';

export const ListItemDisplay = ({ itemValue, onEdit }) => (
  <span className="input-group" onClick={onEdit}>
    <span className="form-control">
      {itemValue}
    </span>
  </span>
);

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  itemValue: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};
