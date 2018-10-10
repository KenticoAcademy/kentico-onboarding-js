import React from 'react';
import PropTypes from 'prop-types';
import { StaticItem } from '../containers/StaticItem';
import { EditableItem } from '../containers/EditableItem';

export const Item = ({ id, index, isInEditMode }) =>
  (isInEditMode
    ? (
      <EditableItem
        id={id}
        index={index}
      />
    )
    : (
      <StaticItem
        id={id}
        index={index}
      />
    ));

Item.displayName = 'Item';

Item.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isInEditMode: PropTypes.bool.isRequired,
};
