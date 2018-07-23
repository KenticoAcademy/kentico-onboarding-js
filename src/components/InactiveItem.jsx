import React from 'react';
import PropTypes from 'prop-types';

import { ImmutableItem } from './ImmutableItem';

export const InactiveItem = (props) => (
  <div onClick={props.onItemClick}>
    {props.index + 1}.
    {props.item.text}
  </div>
);

InactiveItem.displayName = 'InactiveItem';

InactiveItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.instanceOf(ImmutableItem).isRequired,
  onItemClick: PropTypes.func.isRequired,
};
