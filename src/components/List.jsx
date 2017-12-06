import React from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { keyMap } from '../constants/keys';
import { ListItem } from './ListItem.jsx';
import { NewItemForm } from './NewItemForm';

const propTypes = {
  onSaveItemChanges: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onAddNewItem: PropTypes.func.isRequired,
  onCancelItemChanges: PropTypes.func.isRequired,
  onOpenItemForEditing: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
};

const List = ({ items, onSaveItemChanges, onDeleteItem, onAddNewItem, onCancelItemChanges, onOpenItemForEditing }) => {
  const listItems = items.map((item, index) => (
    <li
      className="list-group-item"
      key={item.id}
    >
      <ListItem
        item={item}
        number={index + 1}
        onSave={onSaveItemChanges}
        onDelete={onDeleteItem}
        onItemOpened={onOpenItemForEditing}
        onCancel={onCancelItemChanges}
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
