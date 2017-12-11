import React from 'react';
import PropTypes from 'prop-types';
import { EditedListItem } from '../containers/EditedListItem.jsx';
import { UneditedListItem } from '../containers/UneditedListItem.jsx';

const ListItem = ({ itemId, isBeingEdited }) => {
  return (
    isBeingEdited ?
      <EditedListItem
        itemId={itemId}
      /> :
      <UneditedListItem
        itemId={itemId}
      />);
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  itemId: PropTypes.string.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
};

export { ListItem };
