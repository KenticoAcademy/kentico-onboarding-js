import PropTypes from 'prop-types';
import React from 'react';

const UneditedListItem = ({ onTextClick, itemText }) => (
  <div
    className="form-control-static"
    onClick={onTextClick}
  >
    {itemText}
  </div>
);

UneditedListItem.displayName = 'EditedListItem';

UneditedListItem.propTypes = {
  itemText: PropTypes.string.isRequired,
  onTextClick: PropTypes.func.isRequired,
};

export { UneditedListItem };

