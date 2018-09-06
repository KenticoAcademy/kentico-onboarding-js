import React from 'react';
import PropTypes from 'prop-types';

export const StaticItem = ({ item, onStartEdit, index }) => {
  const _editItem = () => {
    onStartEdit(item.id);
  };

  return (
    <div onClick={_editItem}>
      {index}. {item.text}
    </div>
  );
};

StaticItem.displayName = 'StaticItem';

StaticItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  onStartEdit: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};
