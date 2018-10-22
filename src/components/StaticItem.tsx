import React from 'react';
import PropTypes from 'prop-types';

export const StaticItem = ({ index, item, onItemClick }) => (
  <div onClick={onItemClick}>
    {index}. {item.text}
  </div>
);

StaticItem.displayName = 'StaticItem';

StaticItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,

  onItemClick: PropTypes.func.isRequired
};
