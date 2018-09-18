import React from 'react';
import PropTypes from 'prop-types';

export const StaticItem = ({ onStartEdit, index, item }) => (
  <div onClick={onStartEdit}>
    {index}. {item.text}
  </div>
);

StaticItem.displayName = 'StaticItem';

StaticItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  onStartEdit: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};
