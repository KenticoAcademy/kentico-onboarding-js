import React from 'react';

export const ListItemDisplay = ({ itemValue, onEdit }) => {
  return (
    <span className="input-group" onClick={onEdit}>
      <span className="form-control">
        {itemValue}
      </span>
    </span>
  );
};

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  itemValue: React.PropTypes.string.isRequired,
  onEdit: React.PropTypes.func.isRequired,
};
