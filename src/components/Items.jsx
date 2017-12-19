import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '../containers/ListItem';

const propTypes = {
  itemIds: PropTypes.arrayOf(PropTypes.string),
};

const Items = ({ itemIds }) =>
  itemIds.map((itemId, index) => (
    <li
      className="list-group-item"
      key={itemId}
    >
      <ListItem
        itemId={itemId}
        number={index + 1}
      />
    </li>
  ));

Items.displayName = 'Items';
Items.propTypes = propTypes;

export { Items };
