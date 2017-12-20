import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListItem } from '../containers/ListItem';
import { SFC } from 'react';
import { Guid } from '../models/Guid';

const propTypes = {
  itemIds: PropTypes.arrayOf(PropTypes.string),
};

export interface IItemsDataProps {
  itemIds: Guid[];
}

const Items: SFC<IItemsDataProps> = ({ itemIds }) => (
  <div>
    {itemIds.map((itemId, index) => (
      <li
        className="list-group-item"
        key={itemId}
      >
        <ListItem
          itemId={itemId}
          itemNumber={index + 1}
        />
      </li>))}
  </div>
);

Items.displayName = 'Items';
Items.propTypes = propTypes;

export { Items };
