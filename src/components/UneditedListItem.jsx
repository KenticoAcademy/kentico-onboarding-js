import PropTypes from 'prop-types';
import React from 'react';

export const UneditedListItem = ({ toggleEditing, itemText }) => (
  <div
    className="form-control-static"
    onClick={toggleEditing}
  >
    {itemText}
  </div>
);

UneditedListItem.propTypes = {
  itemText: PropTypes.string.isRequired,
  toggleEditing: PropTypes.func.isRequired,
};

