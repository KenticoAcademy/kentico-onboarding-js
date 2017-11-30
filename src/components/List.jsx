import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from './ListItem';
import { EditedListItem } from './EditedListItem';

export const List = ({ itemsMap, deleteItem, updateItemText, toggleEditing }) => {
  return (
    <div>
      {itemsMap.valueSeq().map((item, index) =>
        <div
          className="list-group-item form-inline"
          key={item.id}
        >
          {index + 1}
          {'. '}
          {item.isBeingEdited ?
            <EditedListItem
              text={item.text}
              onSave={(newText) => updateItemText(item.id, newText)}
              onDelete={() => deleteItem(item.id)}
              onCancel={() => toggleEditing(item.id)}
            /> : <ListItem
              text={item.text}
              onClick={() => toggleEditing(item.id)}
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
