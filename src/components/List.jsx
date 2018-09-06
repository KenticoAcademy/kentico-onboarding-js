import React from 'react';
import PropTypes from 'prop-types';
import { Seq } from 'immutable';
import { Item } from './Item';

export const List = ({ items }) => (
  items
    .map((item, index) => (
      <Item
        key={item.id}
        item={item}
        position={index + 1}
      />
    ))
);

List.displayName = 'List';

List.propTypes = {
  items: PropTypes.instanceOf(Seq).isRequired,
};
