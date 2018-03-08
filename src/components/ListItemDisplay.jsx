// components/ListItemDisplay.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { ToDoItem } from '../models/toDoItem';

export const ListItemDisplay = ({ item, bullet, onItemEdit }) => (
  <div onClick={onItemEdit}>
    {bullet}.&nbsp;
    {item.value}
  </div>
);

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  item: PropTypes.instanceOf(ToDoItem).isRequired,
  bullet: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onItemEdit: PropTypes.func.isRequired,
};
