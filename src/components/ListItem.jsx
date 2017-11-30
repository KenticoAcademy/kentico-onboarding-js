import PropTypes from 'prop-types';
import React from 'react';

export const ListItem = ({ toggleEditing, itemText }) => (
  <div
    className="form-control-static"
    onClick={toggleEditing}
  >
    {itemText}
  </div>
);

ListItem.propTypes = {
  itemText: PropTypes.string.isRequired,
  toggleEditing: PropTypes.func.isRequired,
};

