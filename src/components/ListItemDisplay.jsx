// components/ListItemDisplay.jsx

import React from 'react';
import PropTypes from 'prop-types';

import { ToDoItem } from '../models/toDoItem';

export const ListItemDisplay = ({ item: { bullet, value }, onEdit }) => (
  <div onClick={onEdit}>
    {bullet}.&nbsp;
    {value}
  </div>
);

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  item: PropTypes.instanceOf(ToDoItem).isRequired,
  onEdit: PropTypes.func.isRequired,
};
