// components/ListItem.jsx

import React from 'react';
import PropTypes from 'prop-types';

import { ListItemEditor } from '../containers/ListItemEditor';
import { ListItemDisplay } from '../containers/ListItemDisplay';

export const ListItem = ({ item }) => {
  return (
    item.isBeingEdited ?
      <ListItemEditor
        item={item}
      /> :
      <ListItemDisplay
        item={item}
      />
  );
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  item: PropTypes.shape({
    isBeingEdited: PropTypes.bool,
  }).isRequired,
};
