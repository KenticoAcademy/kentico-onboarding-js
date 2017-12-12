import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from './ListItem';

const propTypes = {
  onSaveItemChanges: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onCancelItemChanges: PropTypes.func.isRequired,
  onOpenItemForEditing: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
};

const Items = ({ items, onSaveItemChanges, onDeleteItem, onCancelItemChanges, onOpenItemForEditing }) =>
  items.map((item, index) => (
    <li
      className="list-group-item"
      key={item.id}
    >
      <ListItem
        item={item}
        number={index + 1}
        onSave={onSaveItemChanges}
        onCancel={onCancelItemChanges}
        onDelete={onDeleteItem}
        onItemOpened={onOpenItemForEditing}
      />
    </li>
  ));

Items.displayName = 'Items';
Items.propTypes = propTypes;

export { Items };
