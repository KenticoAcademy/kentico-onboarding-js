import React from 'react';
import PropTypes from 'prop-types';
import { StaticItem } from '../containers/StaticItem';
import { EditableItem } from '../containers/EditableItem';

export const Item = ({
  item, index
}) =>
  (item.isInEditMode
    ? (
      <EditableItem
        item={item}
        index={index}
      />
    )
    : (
      <StaticItem
        item={item}
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
};
