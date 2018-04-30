import React from 'react';
import PropTypes from 'prop-types';

const ListItemDisplay = ({ text }) => (
  <span>{text}</span>
);

ListItemDisplay.displayName = 'ListItemDisplay';
ListItemDisplay.propTypes = {
  text: PropTypes.string.isRequired,
};

export { ListItemDisplay };
