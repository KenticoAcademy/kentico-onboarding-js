import React from 'react';
import PropTypes from 'prop-types';

export const StaticItem = ({ item, onClick, index }) => {
  const clickHandler = e => {
    e.preventDefault();
    onClick(item.id);
  };

  return (
    <div onClick={clickHandler}>
      {index}. {item.value}
    </div>
  );
};

StaticItem.displayName = 'StaticItem';

StaticItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
