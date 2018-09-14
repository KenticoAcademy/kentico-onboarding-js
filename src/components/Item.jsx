import React from 'react';
import PropTypes from 'prop-types';
import { EditableItem } from './EditableItem';
import { StaticItem } from './StaticItem';

export const Item = ({
  item, index, onSaveItem, onDeleteItem, onCancelEdit, onStartEdit
}) =>
  (item.isInEditMode
    ? (
      <EditableItem
        item={item}
        index={index}
        onSaveItem={onSaveItem}
        onDeleteItem={onDeleteItem}
        onCancelEdit={onCancelEdit}
      />
    )
    : (
      <StaticItem
        item={item}
        onStartEdit={onStartEdit}
        index={index}
      />
    ));

Item.displayName = 'Item';

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  onSaveItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  onStartEdit: PropTypes.func.isRequired
};
