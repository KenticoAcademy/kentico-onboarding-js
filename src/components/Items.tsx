import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListItem } from '../containers/ListItem';
import { SFC } from 'react';

const propTypes = {
  itemIds: PropTypes.arrayOf(PropTypes.string),
};

export interface IListDataProps {
  itemIds: string[];
}

const Items: SFC<IListDataProps> = ({ itemIds }) => (
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
