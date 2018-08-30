import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Item } from './Item';

export const List = (props) => {
  const itemsValueSeq = props.items.valueSeq();

  return (
    itemsValueSeq
      .map((item, index) => (
        <Item
          key={item.id}
          id={item.id}
          text={item.text}
          position={index + 1}
          onSave={props.onSave}
          onDelete={props.onDelete}
        />
      ))
  );
};

List.displayName = 'List';

List.propTypes = {
  items: PropTypes.instanceOf(Map).isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
