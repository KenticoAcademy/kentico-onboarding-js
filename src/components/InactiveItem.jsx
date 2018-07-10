import React from 'react';
import PropTypes from 'prop-types';

export const InactiveItem = (props) => (
  <div onClick={props.onItemClick}>
    {props.index + 1}.
    {props.item.text}
  </div>
);

InactiveItem.displayName = 'InactiveItem';

InactiveItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
  onItemClick: PropTypes.func.isRequired,
};
