import React from 'react';
import PropTypes from 'prop-types';
import { EditedListItem } from '../containers/EditedListItemContainer';
import { ListItem } from '../containers/ListItemContainer';

export const List = ({ itemsMap }) => {
  return (
    <div>
      {itemsMap.valueSeq().map((item, index) =>
        <div
          className="list-group-item form-inline"
          key={item.id}
        >
          {index + 1}
          .
          {item.isBeingEdited ?
            <EditedListItem
              text={item.text}
              itemId={item.id}
            /> :
            <ListItem
              itemText={item.text}
              itemId={item.id}
            />}
        </div>
      )}
    </div>
  );
};

List.propTypes = {
  itemsMap: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
  updateItemText: PropTypes.func.isRequired,
  toggleEditing: PropTypes.func.isRequired,
};
