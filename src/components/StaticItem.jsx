import React from 'react';
import PropTypes from 'prop-types';

export const StaticItem = ({ onClick, index, value }) => {
  return (
    <div onClick={onClick}>
      {index}. {value}
    </div>
  );
};

StaticItem.displayName = 'NewItem';

StaticItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number,
  value: PropTypes.string.isRequired
};
