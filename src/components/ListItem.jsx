// components/ListItem.jsx

import React from 'react';
import PropTypes from 'prop-types';

import { ListItemEditor } from '../containers/ListItemEditor';
import { ListItemDisplay } from '../containers/ListItemDisplay';
import { ListItem as ListItemModel } from '../models/listItem';

export const ListItem = ({ isBeingEdited, itemValue, itemKey, bullet }) => {
  return (
    isBeingEdited ?
      <ListItemEditor
        itemValue={itemValue}
        itemKey={itemKey}
        bullet={bullet}
      /> :
      <ListItemDisplay
        itemValue={itemValue}
        itemKey={itemKey}
        bullet={bullet}
      />
  );
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  item: PropTypes.instanceOf(ListItemModel).isRequired,
  itemKey: PropTypes.string.isRequired,
  itemValue: PropTypes.string.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
  bullet: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
