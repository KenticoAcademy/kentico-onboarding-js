import React from 'react';
import PropTypes from 'prop-types';
import { Seq } from 'immutable';
import { Item } from './Item';

export const List = ({ items, onSave, onDelete }) => (
  items
    .map((item, index) => (
      <Item
        key={item.id}
        id={item.id}
        text={item.text}
        position={index + 1}
        onSave={onSave}
        onDelete={onDelete}
      />
    ))
);

List.displayName = 'List';

List.propTypes = {
  items: PropTypes.instanceOf(Seq).isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
