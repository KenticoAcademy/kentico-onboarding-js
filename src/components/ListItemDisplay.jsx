// components/ListItemDisplay.jsx

import React from 'react';
import PropTypes from 'prop-types';

export const ListItemDisplay = ({ item: { value, bullet }, startEditing }) => (
  <div onClick={startEditing}>
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

  startEditing: PropTypes.func.isRequired,
};
