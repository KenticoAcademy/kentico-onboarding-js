// components/ListItemDisplay.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '../models/listItem';

export const ListItemDisplay = ({ item, bullet, onItemEdit }) => (
  <div onClick={onItemEdit}>
    {bullet}.&nbsp;
    {item.todo.value}
  </div>
);

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  item: PropTypes.instanceOf(ListItem).isRequired,
  bullet: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onItemEdit: PropTypes.func.isRequired,
};
