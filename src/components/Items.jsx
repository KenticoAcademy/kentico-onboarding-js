import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from './ListItem';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
};

const Items = ({ items }) =>
  items.map((item, index) => (
    <li
      className="list-group-item"
      key={item.id}
    >
      <ListItem
        item={item}
        number={index + 1}
      />
    </li>
  ));

Items.displayName = 'Items';
Items.propTypes = propTypes;

export { Items };
