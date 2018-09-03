import React from 'react';
import PropTypes from 'prop-types';
import { EditableItem } from './EditableItem';
import { StaticItem } from './StaticItem';

export const Item = ({
  item, index, onEdit, onDelete, onCancel, onClick
}) => {
  return (item.isInEditMode
    ? (
      <EditableItem
        item={item}
        index={index}
        onEdit={onEdit}
        onDelete={onDelete}
        onCancel={onCancel}
      />
    )
    : (
      <StaticItem
        item={item}
        onClick={onClick}
        index={index}
        autoFocus
      />
    ));
};

Item.displayName = 'Item';

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
