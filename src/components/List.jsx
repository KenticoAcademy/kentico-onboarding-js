import React from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { keyMap } from '../constants/keys';
import { ListItem } from './ListItem.jsx';
import { NewItemForm } from './NewItemForm';

const propTypes = {
  onChangeItemText: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onAddNewItem: PropTypes.func.isRequired,
  onCancelUnsavedChanges: PropTypes.func.isRequired,
  onOpenItemForEditing: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
};

const List = ({ items, onChangeItemText, onDeleteItem, onAddNewItem, onCancelUnsavedChanges, onOpenItemForEditing }) => {
  const listItems = items.map((item, index) => (
    <li
      className="list-group-item"
      key={item.id}
    >
      <ListItem
        item={item}
        number={index + 1}
        onSave={onChangeItemText}
        onDelete={onDeleteItem}
        onTextSelected={onOpenItemForEditing}
        onCancel={onCancelUnsavedChanges}
      />
    </li>
  ));

  return (
    <HotKeys keyMap={keyMap}>
      <ol className="list-group">
        {listItems}

        <li className="list-group-item">
          <NewItemForm onSubmit={onAddNewItem} />
        </li>
      </ol>
    </HotKeys>
  );
};

List.displayName = 'List';
List.propTypes = propTypes;

export { List };
