import React from 'react';
import PropTypes from 'prop-types';
import { Seq } from 'immutable';
import { Item } from './Item';

export const List = ({ items }) => (
  items
    .map((id, index) => (
      <Item
        key={id}
        id={id}
        position={index + 1}
      />
    ))
);

List.displayName = 'List';

List.propTypes = {
  items: PropTypes.instanceOf(Seq).isRequired,
};
