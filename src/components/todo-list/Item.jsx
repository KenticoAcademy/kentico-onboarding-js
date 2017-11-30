import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { PlainItem } from '../../containers/todo-list/PlainItem';
import { EditedItem } from '../../containers/todo-list/EditedItem';

const Item = ({ item }) => {
  return ((item.isEdited) ?
    <EditedItem
      item={item}
    /> :
    <PlainItem
      item={item}
    />);
};

Item.propTypes = {
  item: ImmutablePropTypes.contains({
    index: PropTypes.number.isRequired,
    isEdited: PropTypes.bool.isRequired,
  }).isRequired,
};

export { Item };
