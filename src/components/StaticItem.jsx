import React from 'react';
import PropTypes from 'prop-types';

export const StaticItem = ({ item, onClick, index }) => {
  const _editItem = () => {
    onClick(item.id);
  };

  return (
    <div onClick={_editItem}>
      {index}. {item.inputText}
    </div>
  );
};

StaticItem.displayName = 'StaticItem';

StaticItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    inputText: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};
