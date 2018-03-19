// components/ListItem.jsx

import React from 'react';
import PropTypes from 'prop-types';

import { ListItemEditor } from '../containers/ListItemEditor';
import { ListItemDisplay } from '../containers/ListItemDisplay';

export const ListItem = ({ item: { isBeingEdited, changeableValue }, itemKey, bullet }) => {
  return (
    isBeingEdited ?
      <ListItemEditor
        itemValue={changeableValue}
        itemKey={itemKey}
        bullet={bullet}
      /> :
      <ListItemDisplay
        itemValue={changeableValue}
        itemKey={itemKey}
        bullet={bullet}
      />
  );
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  item: PropTypes.shape({
    isBeingEdited: PropTypes.bool,
    temporaryValue: PropTypes.string,
  }).isRequired,
  itemKey: PropTypes.string.isRequired,
  bullet: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
